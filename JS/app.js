import {
  auth,
  db,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "./firebase.js";
// 🔐 Auth Check
const privateRouteCheck = () => {
  const uidLocal = localStorage.getItem("uid");

  onAuthStateChanged(auth, (user) => {
    if (!uidLocal || !user || user.uid !== uidLocal) {
      window.location.replace("./index.html");
    } else {
      // ✅ User authenticated, load card header
      loadCardHeader(user);
      setupNamazTracker();
    }
  });
};

// 🧠 Load Card Header
const loadCardHeader = async (user) => {
  try {
    console.log("🔥 Fetching user data for UID:", user.uid);
    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) {
      console.warn("❌ No user document found for this UID");
      return;
    }

    const data = snap.data();
    console.log("✅ Firestore Data:", data);

    const displayName = `${data.firstName ?? ""} ${data.lastName ?? ""}`;
    const todayDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const cardHeader = document.querySelector(".cardHeader");
    cardHeader.innerHTML = `
      <h2 class="urdu-salam-heading">السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ</h2>
      <div class="urdu-salam-subtitle">خوش آمدید! آپ کی نمازوں کی نگرانی کے لیے</div>
      <h3 class="user-display-name">${displayName}</h3>
      <p class="user-email">${user.email}</p>
      <p class="user-date">${todayDate}</p>
    `;

    // Fill namazTracker for all dates from signupDate to today
    try {
      const signupDate = data.signupDate;
      if (signupDate) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const todayStr = `${yyyy}-${mm}-${dd}`;

        // Helper to get all dates between two yyyy-mm-dd
        function getDateRange(start, end) {
          const arr = [];
          let dt = new Date(start);
          const endDt = new Date(end);
          while (dt <= endDt) {
            const y = dt.getFullYear();
            const m = String(dt.getMonth() + 1).padStart(2, "0");
            const d = String(dt.getDate()).padStart(2, "0");
            arr.push(`${y}-${m}-${d}`);
            dt.setDate(dt.getDate() + 1);
          }
          return arr;
        }

        const allDates = getDateRange(signupDate, todayStr);
        const userDocRef = doc(db, "namazTracker", user.uid);
        const trackerSnap = await getDoc(userDocRef);
        const trackerData = trackerSnap.exists() ? trackerSnap.data() : {};
        let updateNeeded = false;
        const updatePayload = { ...trackerData };
        allDates.forEach((dateStr) => {
          if (!trackerData[dateStr]) {
            updatePayload[dateStr] = {
              Fajr: false,
              Dhuhr: false,
              Asr: false,
              Maghrib: false,
              Isha: false,
            };
            updateNeeded = true;
          }
        });
        if (updateNeeded) {
          await setDoc(userDocRef, updatePayload, { merge: true });
        }
      }
    } catch (fillErr) {
      console.error("Error filling namazTracker for missing dates:", fillErr);
    }
  } catch (err) {
    console.error("❌ Error loading card header:", err);
  }
};

// Namaz Tracking function
const namazNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const namazNamesUrdu = {
  Fajr: "فجر",
  Dhuhr: "ظہر",
  Asr: "عصر",
  Maghrib: "مغرب",
  Isha: "عشاء",
};

// 🔁 Format today's date (yyyy-mm-dd)
const getFormattedDate = () => {
  const today = new Date();
  // Local date string in yyyy-mm-dd
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// Helper: Convert 24-hour time to 12-hour AM/PM
function to12HourFormat(timeStr) {
  const [hour, minute] = timeStr.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

export const setupNamazTracker = async () => {
  const tracker = document.getElementById("namazTracker");
  const buttons = tracker.querySelectorAll("button");
  const uid = auth.currentUser?.uid;
  const date = getFormattedDate();

  if (!uid) {
    console.error("User not authenticated.");
    return;
  }

  // 🔔 Get namaz timings from API
  const namazTimings = await fetchNamazTimings();
  if (!namazTimings) return;

  // 🧾 Show namaz timings on UI
  namazNames.forEach(namaz => {
      const timingElement = document.getElementById(`${namaz}Time`);
      const time24 = namazTimings[namaz.charAt(0).toUpperCase() + namaz.slice(1)];
      if (timingElement && time24) {
          const time12 = to12HourFormat(time24);
          timingElement.textContent = `⏰ ${time12}`;
      }
  });

  const userDocRef = doc(db, "namazTracker", uid);
  const snapshot = await getDoc(userDocRef);
  const userData = snapshot.exists() ? snapshot.data() : {};

  // Initialize namazStatus for today
  let namazStatus = userData[date] || {
    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false,
  };

  // 🧠 Update UI based on stored data
  buttons.forEach((btn) => {
    const namaz = btn.dataset.namaz;
    const capitalNamaz = namaz.charAt(0).toUpperCase() + namaz.slice(1);
    const prayerTimeStr = namazTimings[capitalNamaz];
    const time12 = to12HourFormat(prayerTimeStr);
    // btn.disabled = !isTime; // REMOVE THIS LINE
    btn.textContent = namazStatus[namaz] ? "✅" : "❌";
    btn.title = `Time: ${time12}`;

    btn.onclick = async () => {
      const isTime = isNamazTimePassed(prayerTimeStr); // Move inside handler for real-time check
      if (!isTime) {
        // SweetAlert2 - Stylish Urdu message
        Swal.fire({
          icon: "info",
          title: `<span style="color:#00b894;font-size:2rem;font-family:'Noto Nastaliq Urdu','Jameel Noori Nastaleeq','Noto Sans Arabic',serif;">${namazNamesUrdu[capitalNamaz]} کا وقت ابھی نہیں ہوا!</span>`,
          html: `<div style="font-size:1.3rem;color:#6c5ce7;font-family:'Noto Nastaliq Urdu','Jameel Noori Nastaleeq','Noto Sans Arabic',serif;direction:rtl;">\uD83D\uDD50 براہِ مہربانی، <b>${namazNamesUrdu[capitalNamaz]}</b> کی نماز کا وقت آنے کا انتظار کریں۔<br><br>جب وقت ہو جائے، تبھی اسٹیٹس اپڈیٹ ہوگا۔</div>`,
          background: "#f1f2f6",
          confirmButtonColor: "#00b894",
          confirmButtonText: "<b>ٹھیک ہے</b>",
          customClass: {
            popup: "swal2-border-radius",
            title: "swal2-title-custom",
            htmlContainer: "swal2-html-custom",
            confirmButton: "swal2-confirm-custom",
          },
        });
        return;
      }
      // Data update logic (as before)
      namazStatus = { ...namazStatus, [namaz]: !namazStatus[namaz] };
      btn.textContent = namazStatus[namaz] ? "✅" : "❌";

      const updatePayload = {
        ...userData,
        [date]: { ...namazStatus },
      };
      await setDoc(userDocRef, updatePayload, { merge: true });
    };
  });

  // 🧩 If no data, save default false data for today
  if (!userData[date]) {
    const updatePayload = {
      [`${date}`]: namazStatus,
    };
    await setDoc(userDocRef, updatePayload, { merge: true });
  }
};

// 🌐 Fetch today's namaz timings from AlAdhan API
const fetchNamazTimings = async () => {
  const city = "Karachi";
  const country = "Pakistan";
  const method = 2; // Islamic Society of North America (ISNA)
  const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.timings;
  } catch (error) {
    console.error("Failed to fetch Namaz timings:", error);
    return null;
  }
};

// ✅ Check if current time is after the prayer time
const isNamazTimePassed = (namazTimeStr) => {
  const [hour, minute] = namazTimeStr.split(":").map(Number);
  const now = new Date();
  const namazTime = new Date();
  namazTime.setHours(hour, minute, 0, 0);

  return now >= namazTime;
};


const logoutButton = document.querySelector(".navbar button");
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    // Perform logout logic here
    window.location.replace("../index.html");
  });
}

// 🔁 Call route check on load
window.privateRouteCheck = privateRouteCheck;
