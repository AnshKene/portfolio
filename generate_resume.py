from fpdf import FPDF

class ATS_PDF(FPDF):
    def header(self):
        pass
    def footer(self):
        pass

def generate_ats_resume():
    pdf = ATS_PDF('P', 'mm', 'Letter')
    pdf.add_page()
    # Reduced margin to 10mm to save space
    pdf.set_auto_page_break(auto=True, margin=10)
    
    # Define standard colors
    pdf.set_text_color(0, 0, 0)
    
    # ---------------- HEADER ----------------
    pdf.set_font("Arial", 'B', 18)
    pdf.cell(0, 6, "ANSH KENE", 0, 1, 'C')
    
    pdf.set_font("Arial", '', 10)
    # Contact info: Location | Email | GitHub | LinkedIn
    contact_info = "Nagpur, Maharashtra, India | anshkene10@gmail.com | github.com/AnshKene | linkedin.com/in/anshkene"
    pdf.cell(0, 5, contact_info, 0, 1, 'C')
    pdf.ln(3)
    
    # ---------------- PROFESSIONAL SUMMARY ----------------
    pdf.set_font("Arial", 'B', 11)
    pdf.cell(0, 5, "PROFESSIONAL SUMMARY", 0, 1, 'L')
    pdf.line(pdf.get_x(), pdf.get_y(), pdf.get_x() + 195, pdf.get_y())
    pdf.ln(1)
    
    pdf.set_font("Arial", '', 10)
    summary = (
        "Results-driven Full Stack MERN Developer and AI Enthusiast with expertise in architecting scalable web applications, "
        "real-time systems, and AI-powered solutions. Proficient in React.js, Node.js, MongoDB, and Python-based Deep Learning "
        "frameworks. Adept at designing RESTful APIs, optimizing database performance, and integrating machine learning models "
        "into production-ready applications to drive business value."
    )
    pdf.multi_cell(0, 4.5, summary)
    pdf.ln(3)

    # ---------------- TECHNICAL SKILLS ----------------
    pdf.set_font("Arial", 'B', 11)
    pdf.cell(0, 5, "TECHNICAL SKILLS", 0, 1, 'L')
    pdf.line(pdf.get_x(), pdf.get_y(), pdf.get_x() + 195, pdf.get_y())
    pdf.ln(1)
    
    pdf.set_font("Arial", 'B', 10)
    pdf.cell(42, 4.5, "Frontend:", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 4.5, "React.js, Next.js, JavaScript (ES6+), HTML5, CSS3", 0, 1, 'L')
    
    pdf.set_font("Arial", 'B', 10)
    pdf.cell(42, 4.5, "Backend:", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 4.5, "Node.js, Express.js, Django, Flask, RESTful APIs", 0, 1, 'L')
    
    pdf.set_font("Arial", 'B', 10)
    pdf.cell(42, 4.5, "Databases & Tools:", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 4.5, "MongoDB, SQL, Git, GitHub, Postman, WebSockets (Socket.io)", 0, 1, 'L')
    
    pdf.set_font("Arial", 'B', 10)
    pdf.cell(42, 4.5, "AI & Machine Learning:", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 4.5, "Deep Learning, Convolutional Neural Networks (CNN), Grad-CAM, TensorFlow, Keras", 0, 1, 'L')

    pdf.set_font("Arial", 'B', 10)
    pdf.cell(42, 4.5, "Languages:", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 4.5, "C, C++, Java, Python, JavaScript", 0, 1, 'L')
    pdf.ln(3)

    # ---------------- EXPERIENCE ----------------
    pdf.set_font("Arial", 'B', 11)
    pdf.cell(0, 5, "EXPERIENCE", 0, 1, 'L')
    pdf.line(pdf.get_x(), pdf.get_y(), pdf.get_x() + 195, pdf.get_y())
    pdf.ln(1)
    
    pdf.set_font("Arial", 'B', 10)
    pdf.cell(130, 5, "Accurate Solution", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 5, "Nagpur, India", 0, 1, 'R')
    
    pdf.set_font("Arial", 'I', 10)
    pdf.cell(130, 5, "MERN Stack Developer Intern", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 5, "Jan 2025 - Apr 2025", 0, 1, 'R')
    
    pdf.multi_cell(0, 4.5, "- Developed and deployed scalable backend services using Node.js and Express.js, improving server response times and application performance.")
    pdf.multi_cell(0, 4.5, "- Built robust, secure RESTful APIs to integrate frontend client interfaces with MongoDB databases, ensuring high data consistency.")
    pdf.multi_cell(0, 4.5, "- Architected dynamic real-world applications including a comprehensive CRM portal and an e-commerce Online Book Store.")
    pdf.multi_cell(0, 4.5, "- Collaborated with cross-functional teams in an Agile environment to optimize code quality and system architecture.")
    pdf.ln(3)

    # ---------------- PROJECTS ----------------
    pdf.set_font("Arial", 'B', 11)
    pdf.cell(0, 5, "PROJECTS", 0, 1, 'L')
    pdf.line(pdf.get_x(), pdf.get_y(), pdf.get_x() + 195, pdf.get_y())
    pdf.ln(1)
    
    # Project 1
    pdf.set_font("Arial", 'B', 10)
    pdf.cell(130, 5, "Samvaad Chat Application", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 5, "React.js, Node.js, MongoDB, Socket.io", 0, 1, 'R')
    pdf.multi_cell(0, 4.5, "- Architected a real-time messaging platform supporting secure user authentication, one-to-one messaging, and scalable group chats.")
    pdf.multi_cell(0, 4.5, "- Implemented bi-directional, event-driven communication using WebSockets (Socket.io) to enable instant media sharing and live online/offline status tracking.")
    pdf.ln(2)

    # Project 2
    pdf.set_font("Arial", 'B', 10)
    pdf.cell(130, 5, "Chest X-ray Ensemble AI", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 5, "Python, TensorFlow, Deep Learning", 0, 1, 'R')
    pdf.multi_cell(0, 4.5, "- Engineered a sophisticated medical image classification system utilizing an ensemble of Multiple Convolutional Neural Network (CNN) models.")
    pdf.multi_cell(0, 4.5, "- Enhanced predictive accuracy and diagnostic reliability for X-ray analysis through advanced data augmentation and ensemble weighting techniques.")
    pdf.ln(2)

    # Project 3
    pdf.set_font("Arial", 'B', 10)
    pdf.cell(130, 5, "CRM Portal", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 5, "React.js, Node.js, Express.js, MongoDB", 0, 1, 'R')
    pdf.multi_cell(0, 4.5, "- Developed a comprehensive Customer Relationship Management (CRM) platform with a modular backend structure.")
    pdf.multi_cell(0, 4.5, "- Designed complex MongoDB schemas and optimized REST API endpoints to facilitate efficient customer data management and streamlined analytics.")
    pdf.ln(3)

    # ---------------- EDUCATION ----------------
    pdf.set_font("Arial", 'B', 11)
    pdf.cell(0, 5, "EDUCATION", 0, 1, 'L')
    pdf.line(pdf.get_x(), pdf.get_y(), pdf.get_x() + 195, pdf.get_y())
    pdf.ln(1)
    
    pdf.set_font("Arial", 'B', 10)
    pdf.cell(130, 5, "St. Vincent Pallotti College of Engineering & Technology", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 5, "Nagpur, India", 0, 1, 'R')
    
    pdf.set_font("Arial", 'I', 10)
    pdf.cell(130, 5, "Bachelor of Technology in Artificial Intelligence", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 5, "Expected 2026", 0, 1, 'R')
    pdf.multi_cell(0, 4.5, "- Relevant Coursework: Database Management Systems (DBMS), Design and Analysis of Algorithms, Object-Oriented Programming, Web Programming with AI.")
    pdf.ln(2)

    pdf.set_font("Arial", 'B', 10)
    pdf.cell(130, 5, "Government Polytechnic Nagpur", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 5, "Nagpur, India", 0, 1, 'R')
    
    pdf.set_font("Arial", 'I', 10)
    pdf.cell(130, 5, "Diploma in Information Technology", 0, 0, 'L')
    pdf.set_font("Arial", '', 10)
    pdf.cell(0, 5, "2022 - 2025", 0, 1, 'R')
    pdf.multi_cell(0, 4.5, "- Graduated with distinction: 87.05%. Focus on Data Structures, Operating Systems, and Computer Networks.")

    # Output
    pdf.output("resume.pdf")

if __name__ == "__main__":
    generate_ats_resume()
    print("ATS Resume generated successfully.")
