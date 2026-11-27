// Ajoute les permissions nécessaires aux alarmes (à lancer après « npx cap add android »)
const fs = require("fs");
const p = "android/app/src/main/AndroidManifest.xml";
let x = fs.readFileSync(p, "utf8");
const perms = ["POST_NOTIFICATIONS","SCHEDULE_EXACT_ALARM","USE_EXACT_ALARM","VIBRATE","WAKE_LOCK","USE_FULL_SCREEN_INTENT","RECEIVE_BOOT_COMPLETED"];
const add = perms.filter(n => !x.includes("android.permission." + n)).map(n => `    <uses-permission android:name="android.permission.${n}" />\n`).join("");
x = x.replace("<application", add + "    <application");
if(!x.includes("showWhenLocked")) x = x.replace("<activity", '<activity android:showWhenLocked="true" android:turnScreenOn="true"');
fs.writeFileSync(p, x);
console.log("Manifest mis à jour.");
