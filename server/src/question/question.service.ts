import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { In, Repository } from 'typeorm';
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { v4 as uuidv4 } from "uuid";
import { AwsS3Service } from 'src/aws/aws-s3.service';
@Injectable()
export class QuestionService {
  constructor(@InjectRepository(Question)
  private questionRepo: Repository<Question>, private s3Service: AwsS3Service) { }

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const newQuestion = await this.questionRepo.create(createQuestionDto);
      const question = await this.questionRepo.save(newQuestion);

      const client = new ElevenLabsClient({
        apiKey: process.env.ELEVENLABS_API_KEY!,
      });
      const voiceId = process.env.ELEVENLABS_VOICE_ID;

      const voices = await client.voices.getAll();
      console.log(voices);
      if (question && voiceId) {
        const questionWithOptions = `
Question: ${createQuestionDto.text}
Option A: ${createQuestionDto.options[0]}
Option B: ${createQuestionDto.options[1]}
Option C: ${createQuestionDto.options[2]}
Option D: ${createQuestionDto.options[3]}
`;
        const { s3Url } = await this.generateAndUpload(questionWithOptions, voiceId, question.id);
        console.log(s3Url, "s3 url")

        if (s3Url) {
          newQuestion.audioUrl = s3Url;
        }

        const response = await this.questionRepo.save(newQuestion)
        return {
          success: true,
          data: response
        }
      } else {
        return {
          success: false,
          message: "Question creation failed"
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async generateAndUpload(text: string, voiceId: string, questionId: string) {
    try {
      const client = new ElevenLabsClient({
        apiKey: process.env.ELEVENLABS_API_KEY!,
      });

      const audioStream = await client.textToSpeech.convert(voiceId, {
        text,
        modelId: "eleven_multilingual_v2", // good default model
        voiceSettings: {
          stability: 0.5,
          similarityBoost: 0.75,
          speed: 0.73
        },
      });

      const chunks: Buffer[] = [];
      for await (const chunk of audioStream) {
        chunks.push(chunk as Buffer);
      }
      const audioBuffer = Buffer.concat(chunks);
      const key = `questions/${questionId}-${uuidv4()}.mp3`;

      await this.s3Service.uploadFile(audioBuffer, key, "audio/mpeg");

      const s3Url = `${process.env.S3_URL}/${key}`;

      return { s3Url };
    } catch (e) {
      return {
        success: false,
        message: e.me
      }
    }
  }

  async findAll() {
    try {
      const questions = await this.questionRepo.find();
      if (questions) {
        return {
          success: true,
          data: questions
        }
      } else {
        return {
          success: false,
          message: "Error in fetching Questions."
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async findOne(id: string) {
    try {
      const question = await this.questionRepo.findOne({ where: { id } });
      if (question) {
        return {
          success: true,
          data: question
        }
      } else {
        return {
          success: false,
          message: "Question with this id is not available"
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    try {
      const question = await this.questionRepo.findOne({ where: { id } });
      if (!question) {
        return {
          success: false,
          message: "Question with this id is not available"
        }
      } else {
        Object.assign(question, updateQuestionDto);
        const response = await this.questionRepo.save(question);
        if (response) {
          return {
            success: true,
            data: response
          }
        } else {
          return {
            success: false,
            message: "Issue in updating question"
          }
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async remove(id: string) {
    try {
      const question = await this.questionRepo.findOne({ where: { id } });
      if (question) {
        const response = await this.questionRepo.delete(id);
        if (response) {
          return {
            success: true,
            message: "Question deleted successfully"
          }
        } else {
          return {
            success: false,
            message: "Issue in deleting question"
          }
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async getQuestionsByCategory(categoryIds: string[]) {
    try {
      const result = await Promise.all(
        categoryIds.map(async (categoryId) => {
          const _questions = await this.questionRepo.find({ where: { categoryId } });
          return { categoryId, questions: _questions };
        })
      );

      const Questions: Record<string, any[]> = {};
      result.forEach(({ categoryId, questions }) => {
        Questions[categoryId] = questions;
      });

      return {
        success: true,
        data: Questions,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }


}
