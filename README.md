# 🧠 MindSync – Mental Wellness Web App

**MindSync** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to help users take care of their mental health through journaling, mood tracking, and guided breathing exercises.

---

##Demo
https://drive.google.com/file/d/1QEarLlx5pnovjmyR_BtrdFu8_C0OVjiB/view?usp=sharing

---

## 🌟 Features

- **User Authentication**
  - Sign up, log in, log out using JWT-based authentication

- **Journaling**
  - Create, edit, and delete journal entries
  - Optionally respond to hardcoded reflective prompts

- **Mood Tracker**
  - Select multiple moods per day
  - Update mood entries for the current day only
  - View weekly/monthly mood charts 

- **Breathing Exercises**
  - Practice 4-4-4-4 Box Breathing technique to manage stress

- **Dashboard**
  - Personalized greeting
  - Motivational quotes from ZenQuotes API (fallback to hardcoded quotes)

---

## 🛠️ Tech Stack

**Frontend**  
- React.js (Vite)  
- Tailwind CSS (Pastel, gender-neutral theme)  

**Backend**  
- Node.js + Express.js (v4.18.2)  
- MongoDB (Mongoose ODM)  
- JWT for auth  
- ZenQuotes API (for quotes)  

---

## 🛠️ Project Setup

```bash
# Backend Setup
cd backend
npm install
```

Create a `.env` file in the `backend/` folder with the following content:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

```bash
# Frontend Setup
cd frontend
npm install
npm run dev
```
## Author
 Ashreet Kaur Shembe

