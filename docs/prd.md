# Roit - PM Educational Web App आवश्यकता दस्तावेज़

## 1. एप्लिकेशन का नाम
Roit - PM (Personal Manager)

## 2. एप्लिकेशन का विवरण
यह एक Advanced Educational Progressive Web App (PWA) है जो Class 8 से 12 के students के लिए comprehensive study material और AI-powered learning assistance प्रदान करती है। यह app mobile devices पर install की जा सकती है और offline भी काम करती है।
\n## 3. Logo Requirements\n- App icon के रूप में favicon.png का उपयोग करना है
- Professional और custom-designed logo
- Logo को perfect तरीके से fit होना चाहिए
- High-quality और visually appealing design
\n## 4. मुख्य विशेषताएं

### 4.1 Student Dashboard
- **Categories:** Notes 📝, PYQ (Previous Year Questions) 📄, Important Questions ⭐, Reference Books 📚, Mind Maps 🧠, Formulas 🔢, MCQ Tests 📋, IIT-JEE Advanced Questions 🎓
- **Navigation Flow:** Category चुनें → Class चुनें (8-12) → Subject चुनें → Chapter चुनें → Content देखें
- **Advanced In-app PDF Viewer:**
  - PDF app के अंदर ही खुलें
  - Page change करने पर smooth page flip animation
  - Page turn करने पर realistic page turning sound effect
  - View mode options: Single Page View और Double Page View
  - Zoom in/out functionality
  - Page navigation controls (previous/next buttons)
  - Page number indicator और direct page jump option
  - Smooth scrolling और touch gestures support
  - Full-screen mode option
  - Bookmark pages की सुविधा
  - Search text within PDF
- **Recently Viewed Section:** हाल ही में देखे गए content की list
- **Recently Downloaded Section:** हाल ही में download किए गए content की list
- **Copy Button:** Content को copy करने की सुविधा
- **Shortcuts Section:**
  - AI Assistant का quick access shortcut 🤖\n  - Downloaded Content का direct shortcut 📥
  - अन्य frequently used features के shortcuts

### 4.2 User Authentication System
- **Login/Signup Functionality:** Email और Password से\n- **Signup के समय Personal Details Collection:**
  - Email (अनिवार्य)
  - Password (अनिवार्य)
  - Full Name (अनिवार्य)
  - Date of Birth (DOB) (अनिवार्य)
  - Mobile Number (अनिवार्य)
  - Pin Code (अनिवार्य - Leaderboard के लिए)\n  - Address (optional)
  - School/College Name (optional)
  - Current Class (अनिवार्य - 8 से 12 में से select करना)
  - Profile Photo (optional - signup के समय या बाद में upload कर सकते हैं)
- **Login/Signup Flow:**
  - पहली बार app खोलने पर Login/Signup screen दिखाई दे
  - Successful login/signup के बाद user सीधे Dashboard पर redirect हो
  - Login के बाद फिर से Login/Signup option नहीं दिखना चाहिए
  - User का session maintain रहे और logout करने तक logged-in state बना रहे
  - Logout button Profile section में होना चाहिए
- बिना login के केवल content preview, download करने के लिए login जरूरी
- **User Profile Management (Fully Functional):**
  - Profile photo upload/update करने का option - properly working
  - Full Name edit करने का option - properly working
  - Phone number add/edit करने का option - properly working
  - Date of Birth add/edit करने का option - properly working\n  - Pin Code add/edit करने का option - properly working\n  - Address add/edit करने का option - properly working
  - School/College Name add/edit करने का option - properly working
  - Current Class update करने का option - properly working
  - Password change करने का option - properly working
  - Logout option - properly working
  - सभी personal details को view और edit करने की सुविधा - fully functional
  - Profile update करने पर changes immediately reflect होने चाहिए
  - Update success/error messages properly display होने चाहिए
- **Session Management:**
  - User का login state properly store और maintain करना
  - App refresh करने पर भी user logged-in रहे
  - Automatic logout केवल user द्वारा logout button click करने पर ही हो
- **App Reset Functionality:**
  - Complete app reset का option admin panel में
  - Reset करने पर सभी errors automatically clear हो जाएं
  - User data और settings को fresh state में restore करना

### 4.3 Admin Panel
- **Access:** केवल masumboy141@gmail.com email और password: 12/07/2008MP के साथ
- **Admin Features:**
  - Content Upload (PDF, JPG, आदि formats) - Class, Subject, Chapter wise organization के साथ
  - Multiple files एक साथ upload करने की सुविधा
  - Content Management - uploaded content को update और delete करने की सुविधा
  - **Student Management - registered students की complete details देखना:**
    - Email
    - Full Name\n    - Date of Birth (DOB)
    - Mobile Number\n    - Pin Code
    - Address
    - School/College Name
    - Current Class
    - Profile Photo
    - Registration Date
    - Last Login Date
    - सभी students की list को filter और search करने की सुविधा
  - MCQ Upload - simple interface के साथ questions, options और correct answers upload करना
  - IIT-JEE Questions Upload - advanced level questions upload करना
  - Notification भेजने का option - new content, exam reminders, announcements के लिए
  - Content Edit/Delete - uploaded content को modify या remove करना
  - विषय श्रेणी और Class को properly organize करना
  - App Reset Option - पूरे app को reset करने की सुविधा जिससे सभी errors automatically fix हो जाएं
  - Student details को export करने का option (CSV/Excel format में)

### 4.4 AI Helper (Roit - PM AI Assistant) 🤖
- Physics, Chemistry और Mathematics के definitions explain करना
- Formulas को detailed explanation के साथ समझाना
- Students के questions का answer देना
- Step-by-step solutions provide करना
- Advanced level की explanations देने में सक्षम
- Dashboard में AI Assistant का quick access shortcut

### 4.5 MCQ Tests System 📋
- Automatic scoring system
- Timer functionality
- Result analysis और performance tracking
- Students अपने past test results देख सकें
- Subject और chapter wise tests
- **Leaderboard System:** 🏆
  - Pin Code के आधार पर location-wise ranking
  - Overall performance ranking
  - Class-wise और subject-wise leaderboards
  - Top performers की list
  - Real-time ranking updates
  - Student का current position display करना\n
### 4.6 Notification System 🔔
- New content upload की notifications
- Exam reminders\n- Important announcements
- Students को notification preferences select करने का option

## 5. Design Requirements

### 5.1 Visual Design\n- Modern और colorful theme\n- Day/Night mode toggle switch 🌙
- Glassmorphic buttons with floating और shaking animations
- Professional animations और smooth transitions
- Glow effects जहां जरूरी हो
- सभी text clearly visible और readable हों
- Responsive design जो सभी screen sizes पर अच्छे से काम करे
- Logo में favicon.png का उपयोग करना है - professional custom logo design
- Shortcuts को visually prominent तरीके से display करना
- Categories और features में relevant emojis का उपयोग करना

### 5.2 User Interface
- Intuitive navigation\n- Clear category और content organization\n- Easy-to-use search functionality 🔍
- Quick access to frequently used features
- Login के बाद proper navigation flow maintain करना
- Logged-in users को बार-बार login screen नहीं दिखाना
- Signup form में सभी personal details के fields को user-friendly तरीके से present करना\n- Required fields को clearly mark करना
- Dashboard में AI और Downloaded content के shortcuts prominently display करना
- Emojis का उपयोग करके UI को attractive बनाना\n- Profile section में सभी personal details को organized तरीके से display करना

## 6. Security Features 🔒
- Secure user authentication system
- Data encryption\n- Admin panel केवल authorized email (masumboy141@gmail.com) से accessible
- Content download केवल logged-in users के लिए
- Data hack या चोरी से protection
- Secure password storage
- User personal details की privacy और security maintain करना
- Proper session management और authentication state handling
- Student data को securely store करना

## 7. PWA (Progressive Web App) Features
- **Manifest.json file configuration:**
  - App name: Roit - PM
  - App icon: favicon.png का उपयोग करना
  - Display mode: standalone
  - Theme color और background color properly set करना
  - Start URL configure करना
- **Service Worker implementation:**
  - Offline caching strategy
  - Background sync functionality
  - Push notification support
- **Add to Home Screen functionality:**
  - Browser में Add to Home Screen prompt automatically trigger होना चाहिए\n  - Install button या prompt properly display होना चाहिए
  - iOS और Android दोनों platforms पर काम करना चाहिए\n  - Manifest file में सभी required fields properly configure होने चाहिए
- **App Icon:**
  - favicon.png को app icon के रूप में उपयोग करना
  - Multiple sizes में icons generate करना (192x192, 512x512)
  - Manifest file में icon paths properly define करना
- Offline access capability
- Fast loading और smooth performance
- Mobile-first responsive design
- Install करने के बाद native app जैसा experience
- Login state को locally store करना ताकि app reopen करने पर user logged-in रहे
- Error handling और automatic recovery mechanism

## 8. Content Management 📚
- Class-wise organization (8, 9, 10, 11, 12)
- Subject-wise categorization
- Chapter-wise content arrangement
- Multiple file format support (PDF, JPG, etc.)
- Content tagging system
- Easy search और filter options
- Admin द्वारा content को update और delete करने की सुविधा\n
## 9. Technical Requirements
- Progressive Web App architecture
- Advanced in-app PDF viewer integration with:\n  - Page flip animation
  - Page turn sound effects
  - Single page और double page view modes
  - Smooth transitions और gestures
- Image optimization
- Fast loading times
- Cross-browser compatibility
- Mobile optimization
- Robust authentication और session management system
- Login state persistence across app sessions
- User data storage और management system
- Error handling और automatic recovery system
- App reset functionality implementation
- PWA manifest और service worker properly configure करना
- Add to Home Screen functionality को properly implement करना
- Complete user profile management system - fully functional
- Admin panel में comprehensive student data viewing capability
- PDF viewer को fully functional बनाना user dashboard में
- Profile update functionality को properly working बनाना
\n## 10. Additional Requirements
- सभी features को एक prompt file (prom.txt) में document करना
- कोई भी feature miss नहीं होना चाहिए
- Complete feature list को systematically organize करना
- Logo design में favicon.png का उपयोग करना\n- Login functionality को पूरी तरह से test करना और सुनिश्चित करना कि यह properly काम कर रही है
- User experience को smooth बनाना - login के बाद बार-बार authentication screen नहीं दिखनी चाहिए
- Signup process में सभी personal details collection को seamless बनाना
- Required fields (Email, Password, Full Name, DOB, Mobile Number, Pin Code, Current Class) को clearly indicate करना
- Pin Code field को leaderboard feature के लिए properly integrate करना
- Dashboard में AI और Downloaded content के shortcuts को implement करना
- Full app reset functionality को admin panel में add करना जिससे सभी errors automatically resolve हो जाएं
- Leaderboard system को fully functional बनाना
- Categories और features में relevant emojis add करना
- PWA installation को properly configure करना ताकि Add to Home Screen option काम करे
- App icon के रूप में favicon.png को properly integrate करना
- User profile में सभी personal details को editable बनाना - fully functional
- Admin panel में students की complete details को view करने की सुविधा देना
- **User dashboard में PDF viewer को fully functional बनाना:**
  - Page flip animation properly काम करे
  - Page turn sound effect add करना
  - Single page और double page view modes implement करना
  - सभी PDF viewer features properly working होने चाहिए
- **Profile update functionality को fix करना:**
  - सभी profile fields को editable बनाना
  - Update करने पर changes save होने चाहिए\n  - Profile photo upload properly काम करे
  - सभी personal details update हो सकें

## 11. उपयोग की गई छवियां
- **favicon.png:** App icon और logo के रूप में उपयोग
- **Screenshot_2026-01-14-12-24-49-60.jpg:** Reference के लिए उपयोग