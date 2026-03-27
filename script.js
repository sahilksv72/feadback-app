// 🔴 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref("messages");

function sendMessage() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  if(name && message){
    db.push({
      name: name,
      message: message
    });

    document.getElementById("message").value = "";
  }
}

db.on("value", snapshot => {
  const data = snapshot.val();
  let html = "";

  for(let id in data){
    html += `<div class="msg"><b>${data[id].name}:</b> ${data[id].message}</div>`;
  }

  document.getElementById("chat").innerHTML = html;
});