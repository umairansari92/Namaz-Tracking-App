import { db,auth,getFirestore, collection, query, where, getDocs, doc, getDoc,onAuthStateChanged } from "../firebase.js";



// ===============================
// 🔐 User Authentication & Info
// ===============================

// Page load par user ki authentication check karo aur info show karo
// Agar user login hai to salam ke neeche uski info show hogi

document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, (user) => {
    const uidLocal = localStorage.getItem("uid");
    if (!uidLocal || !user || user.uid !== uidLocal) {
      Swal.fire({
        icon: 'warning',
        title: 'رسائی ممنوع',
        text: 'براہ کرم پہلے لاگ ان کریں!',
        confirmButtonText: 'لاگ ان پر جائیں'
      }).then(() => {
        window.location.replace("../index.html");
      });
    } else {
      showUserInfoInHeader(user);
    }
  });
});

// User ki info (naam, email, tareekh) salam ke neeche show karne wala function
async function showUserInfoInHeader(user) {
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) return;
    const data = userDoc.data();
    const displayName = `${data.firstName ?? ""} ${data.lastName ?? ""}`;
    const todayDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const cardHeader = document.querySelector(".cardHeader");
    cardHeader.innerHTML = `
      <h2 class="urdu-salam-heading">السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ</h2>
      <div class="urdu-salam-subtitle">خوش آمدید! آپ کی نمازوں کی ٹریکنگ کے لیے</div>
      <h3 class="user-display-name">${displayName}</h3>
      <p class="user-email">${user.email}</p>
      <p class="user-date">${todayDate}</p>
    `;
  } catch (err) {
    console.error("❌ Error loading card header:", err);
  }
}

// ===============================
// 📅 Namaz History Cards (7/30 din)
// ===============================

// Select box par event listener: jab user 7 ya 30 din select kare to namaz history fetch karo

const prayerHistorySelect = document.querySelector('.prayerHistory select');
prayerHistorySelect.addEventListener('change', function() {
    const days = this.value === "7 Days" ? 7 : 30;
    fetchAndShowNamazHistory(days);
});

// Page load par default value se history dikhao
document.addEventListener('DOMContentLoaded', () => {
    const days = prayerHistorySelect.value === "7 Days" ? 7 : 30;
    fetchAndShowNamazHistory(days);
});

// Namaz history fetch kar ke cards ki soorat mein show karne wala function
async function fetchAndShowNamazHistory(days) {
    const user = auth.currentUser;
    if (!user) return;

    // User ke namazTracker document se data lao
    const userDocRef = doc(db, "namazTracker", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
        renderNamazHistoryCards([]); // Koi data nahi
        return;
    }

    const data = userDocSnap.data(); // Yeh ek object hai jismein keys dates hain

    // Helper: Get last N days as yyyy-mm-dd strings
    function getLastNDates(n) {
      const arr = [];
      const today = new Date();
      for (let i = 0; i < n; i++) {
        const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        arr.push(`${yyyy}-${mm}-${dd}`);
      }
      return arr;
    }

    // Generate newest first, no need to sort
    const lastNDates = getLastNDates(days);
    const records = lastNDates.map(dateStr => ({
      date: dateStr,
      prayers: data[dateStr] || {
        Fajr: false,
        Dhuhr: false,
        Asr: false,
        Maghrib: false,
        Isha: false,
      }
    }));

    renderNamazHistoryCards(records);
}

// Namaz history cards ko grid mein render karne wala function
function renderNamazHistoryCards(data) {
    const container = document.querySelector('.prayerHistoryCard');
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p>Koi record nahi mila</p>";
        return;
    }

    data.forEach(record => {
        const { date, prayers } = record;
        const card = document.createElement('div');
        card.className = "singlePrayerCard";
        card.innerHTML = `
            <h3>${date}</h3>
            <ul>
                <li>Fajr: <span class="${prayers.Fajr ? 'offered' : 'missed'}">${prayers.Fajr ? 'Ada' : 'Qaza'}</span></li>
                <li>Dhuhr: <span class="${prayers.Dhuhr ? 'offered' : 'missed'}">${prayers.Dhuhr ? 'Ada' : 'Qaza'}</span></li>
                <li>Asr: <span class="${prayers.Asr ? 'offered' : 'missed'}">${prayers.Asr ? 'Ada' : 'Qaza'}</span></li>
                <li>Maghrib: <span class="${prayers.Maghrib ? 'offered' : 'missed'}">${prayers.Maghrib ? 'Ada' : 'Qaza'}</span></li>
                <li>Isha: <span class="${prayers.Isha ? 'offered' : 'missed'}">${prayers.Isha ? 'Ada' : 'Qaza'}</span></li>
            </ul>
        `;
        container.appendChild(card);
    });
}

const logoutButton = document.querySelector(".navbar button");
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    Swal.fire({
      icon: 'success',
      title: 'لاگ آؤٹ',
      text: 'آپ کامیابی سے لاگ آؤٹ ہو گئے ہیں!',
      confirmButtonText: 'ٹھیک ہے'
    }).then(() => {
      window.location.replace("../index.html");
    });
  });
}