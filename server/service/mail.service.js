const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secureConnection: false,
	requiresAuth: true,
	//service: "gmail",
	domains: ["gmail.com", "googlemail.com"],
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
})

module.exports.sendActivationMail = async (email, link) => {
	await transporter.sendMail(
		{
			from: process.env.SMTP_USER,
			to: email,
			subject: "Активация аккаунта на " + process.env.API_URL,
			text: "",
			html: `
			<div>
			    <h1>Для активации перейдите по ссылке</h1>
			    <a href="${link}">${link}</a>
			</div>
			`,
		},
		(err, data) => {
			err ? console.log("Error mail send", err) : console.log("Email send Ok!", data)
		}
	)
}
