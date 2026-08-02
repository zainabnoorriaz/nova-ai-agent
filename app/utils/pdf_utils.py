import pdfplumber


def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()

if __name__ == "__main__":
    print(extract_text_from_pdf("app/uploads/Zainab_Noor_Riaz_CV.pdf"))