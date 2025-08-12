(function () {
  const toggle = document.querySelector(".nav__toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.style.display === "flex";
      nav.style.display = isOpen ? "none" : "flex";
      nav.style.flexDirection = "column";
      nav.style.gap = ".25rem";
    });
  }
})();

(function () {
  const title = document.getElementById("welcomeTitle");
  if (!title) return;

  let name = localStorage.getItem("revou_name");
  if (!name) {
    name = prompt("Masukkan namamu untuk sapaan di homepage:") || "";
    name = name.trim();
    if (name) localStorage.setItem("revou_name", name);
  }
  if (name) title.textContent = `Hi ${name}, Welcome To Website`;
})();

(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const el = (id) => document.getElementById(id);
  const err = (name) => document.querySelector(`[data-error-for="${name}"]`);

  const res = {
    name: el("resName"),
    dob: el("resDob"),
    gender: el("resGender"),
    message: el("resMessage"),
    time: document.getElementById("currentTimeValue"),
  };

  const updateTime = () => {
    const now = new Date();
    res.time.textContent = now.toUTCString();
  };
  updateTime();
  setInterval(updateTime, 1000 * 30);

  const validators = {
    name: (v) => v.trim().length >= 2 || "Nama minimal 2 karakter",
    dob: (v) => !!v || "Tanggal lahir wajib diisi",
    gender: () => {
      const checked = form.querySelector('input[name="gender"]:checked');
      return !!checked || "Pilih jenis kelamin";
    },
    message: (v) => v.trim().length >= 5 || "Pesan minimal 5 karakter",
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value || "";
    const dob = form.dob.value || "";
    const message = form.message.value || "";
    const genderInput = form.querySelector('input[name="gender"]:checked');
    const gender = genderInput ? genderInput.value : "";

    ["name", "dob", "gender", "message"].forEach(
      (k) => (err(k).textContent = "")
    );

    let ok = true;
    const vName = validators.name(name);
    if (vName !== true) {
      ok = false;
      err("name").textContent = vName;
    }
    const vDob = validators.dob(dob);
    if (vDob !== true) {
      ok = false;
      err("dob").textContent = vDob;
    }
    const vGen = validators.gender();
    if (vGen !== true) {
      ok = false;
      err("gender").textContent = vGen;
    }
    const vMsg = validators.message(message);
    if (vMsg !== true) {
      ok = false;
      err("message").textContent = vMsg;
    }

    if (!ok) return;

    res.name.textContent = name;
    res.dob.textContent = dob ? dob.split("-").reverse().join("-") : "—";
    res.gender.textContent = gender || "—";
    res.message.textContent = message;

    form.reset();
  });
})();
