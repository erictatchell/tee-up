"use server";

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

type MatchEmailProps = {
  to: string; // user receiving the email
  likedUserEmail: string; // the person they liked
};

export async function sendMatchEmail({ to, likedUserEmail }: MatchEmailProps) {
  const msg = {
    to,
    from: 'pavanpreet.brar20@gmail.com', // your verified sender
    subject: '⛳️ You found a match on Tee Up!',
    text: `You liked someone on Tee Up! You can reach out to them at: ${likedUserEmail}`,
    html: `
      <h2>🏌️‍♂️ You found a match!</h2>
      <p>You liked someone on Tee Up!</p>
      <p><strong>Contact them at:</strong> <a href="mailto:${likedUserEmail}">${likedUserEmail}</a></p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('Match email sent');
  } catch (error) {
    console.error('Email send error:', error);
  }
}