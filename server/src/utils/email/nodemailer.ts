// // mail.service.ts
// import * as nodemailer from 'nodemailer';
// import * as ejs from 'ejs';
// import * as path from 'path';
// import * as fs from 'fs';

// export async function sendWelcomeEmail(to: string, name: string) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'momsaysapplication@gmail.com',
//             pass: process.env.GOOGLE_APP_PASSWORD
//         }
//     });

//     const templatePath = path.join(process.cwd(), 'src/utils/emailTemplates/welcome.ejs');
//     const templateContent = fs.readFileSync(templatePath, 'utf-8');

//     const htmlContent = ejs.render(templateContent, { name });

//     const mailOptions = {
//         from: `"MomSays" <${process.env.EMAIL_USER}>`,
//         to,
//         subject: 'Welcome to MomSays!',
//         html: htmlContent
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log('✅ Email sent:', info.response);
//         return { status: 'success', message: 'Email sent successfully' };
//     } catch (error) {
//         console.error('❌ Email send error:', error);
//         return { status: 'error', message: error.message };
//     }
// }

// export async function childWelcomeEmail(to: string, name: string, alias: string) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.GOOGLE_APP_USER,
//             pass: process.env.GOOGLE_APP_PASSWORD
//         }
//     });

//     const templatePath = path.join(process.cwd(), 'src/utils/emailTemplates/childreg.ejs');
//     const templateContent = fs.readFileSync(templatePath, 'utf-8');

//     const htmlContent = ejs.render(templateContent, { name, alias });

//     const mailOptions = {
//         from: `"MomSays" <${process.env.EMAIL_USER}>`,
//         to,
//         subject: 'Welcome to MomSays!',
//         html: htmlContent
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log('✅ Email sent:', info.response);
//         return { status: 'success', message: 'Email sent successfully' };
//     } catch (error) {
//         console.error('❌ Email send error:', error);
//         return { status: 'error', message: error.message };
//     }
// }

// export async function passwordResetEmail(to: string, name: string, resetLink: string) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.GOOGLE_APP_USER,
//             pass: process.env.GOOGLE_APP_PASSWORD
//         }
//     });

//     const templatePath = path.join(process.cwd(), 'src/utils/emailTemplates/passwordreset.ejs');
//     const templateContent = fs.readFileSync(templatePath, 'utf-8');

//     const htmlContent = ejs.render(templateContent, { name, resetLink });

//     const mailOptions = {
//         from: `"MomSays" <${process.env.EMAIL_USER}>`,
//         to,
//         subject: 'Welcome to MomSays!',
//         html: htmlContent
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log('✅ Email sent:', info.response);
//         return { status: 'success', message: 'Email sent successfully' };
//     } catch (error) {
//         console.error('❌ Email send error:', error);
//         return { status: 'error', message: error.message };
//     }
// }
