import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_EMAIL = "imranshahidkhan333@gmail.com"         # 🔁 Replace with your Gmail
SMTP_PASSWORD = "titdbfxfeigniugw"         # 🔁 Replace with your Gmail App Password

def send_reset_email(to_email: str, reset_link: str):
    subject = "Reset Your Password"
    body = f"""\
Hi,

You requested to reset your password. Click the link below:

{reset_link}

If you did not make this request, you can ignore this email.

Thanks,
Your App Team
"""

    msg = MIMEMultipart()
    msg["From"] = SMTP_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.sendmail(SMTP_EMAIL, to_email, msg.as_string())
            print(f"[SMTP] Reset email sent to {to_email}")
    except Exception as e:
        print("[SMTP ERROR]", e)
        raise
