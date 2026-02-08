import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        /* 🔐 LOGIN (DO NOT CHANGE) */
        title: "Occamy Field Ops",
        subtitle_login: "Secure access for Admin & Distributors",
        subtitle_signup: "Create your official Occamy account",
        subtitle_otp: "Verify your email with OTP",
        login: "Login",
        create: "Create Account",
        username: "Username",
        password: "Password",
        email: "Official Email ID",
        otp: "Enter OTP",
      },

      /* 📋 MEETING MODULE */
      meeting: {
        createMeeting: "Create Meeting",
        meetingType: "Meeting Type",
        oneToOne: "One to One",
        group: "Group",
        category: "Category",
        farmer: "Farmer",
        seller: "Seller",
        influencer: "Influencer",
        personName: "Person Name",
        attendees: "Number of Attendees",
        village: "Village / Location",
        businessPotential: "Business Potential",
        photo: "Photo",
        save: "Create Meeting",
        saving: "Saving...",
        myMeetings: "My Meetings",
        meetingDetails: "Meeting Details",
        location: "Location",
      },
    },

    hi: {
      translation: {
        /* 🔐 LOGIN (DO NOT CHANGE) */
        title: "ऑक्कैमी फील्ड ऑप्स",
        subtitle_login: "एडमिन और डिस्ट्रीब्यूटर के लिए सुरक्षित लॉगिन",
        subtitle_signup: "अपना आधिकारिक ऑक्कैमी अकाउंट बनाएं",
        subtitle_otp: "OTP द्वारा ईमेल सत्यापित करें",
        login: "लॉगिन",
        create: "अकाउंट बनाएं",
        username: "यूज़रनेम",
        password: "पासवर्ड",
        email: "आधिकारिक ईमेल आईडी",
        otp: "OTP दर्ज करें",
      },

      /* 📋 MEETING MODULE */
      meeting: {
        createMeeting: "मीटिंग बनाएँ",
        meetingType: "मीटिंग का प्रकार",
        oneToOne: "एक-से-एक",
        group: "समूह",
        category: "श्रेणी",
        farmer: "किसान",
        seller: "विक्रेता",
        influencer: "प्रभावशाली",
        personName: "व्यक्ति का नाम",
        attendees: "उपस्थित लोगों की संख्या",
        village: "गाँव / स्थान",
        businessPotential: "व्यवसाय की संभावना",
        photo: "फोटो",
        save: "मीटिंग सहेजें",
        saving: "सहेजा जा रहा है...",
        myMeetings: "मेरी मीटिंग्स",
        meetingDetails: "मीटिंग विवरण",
        location: "स्थान",
      },
    },
  },
});

export default i18n;
