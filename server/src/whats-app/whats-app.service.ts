import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class WhatsAppService {
    async sendWhatsAppMessage(
        parentName: string,
        childName: string,
        loginTime: string
    ): Promise<any> {
        const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
        const recipientNumber = process.env.TEST_RECIPIENT_NUMBER;

        const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

        console.log(url, "----------------url");

        const payload = {
            messaging_product: "whatsapp",
            to: recipientNumber,
            type: "template",
            template: {
                name: "child_login_alert",
                language: { code: "en_US" },
                components: [
                    {
                        type: "body",
                        parameters: [
                            { type: "text", text: parentName },
                            { type: "text", text: childName },
                        ],
                    },
                ],
            }
        };

        console.log(payload, "----------------payload");
        try {
            const response = await axios.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error sending WhatsApp message:", error.response?.data || error.message);
            throw new Error("Failed to send WhatsApp message");
        }
    }
}
