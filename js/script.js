/* =========================================================
   UNTUK AYAH — INTERAKSI HALAMAN
   Tanpa pustaka tambahan, tanpa backend.
========================================================= */

(() => {
    "use strict";

    document.documentElement.classList.replace("no-js", "js");

    const body = document.body;
    const opening = document.getElementById("opening");
    const openButton = document.getElementById("openSurprise");
    const letterView = document.getElementById("letterView");
    const sheet = document.getElementById("surat");
    const sheetTitle = document.getElementById("suratTitle");
    const suratKecil = document.querySelector(".envelope__letter");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");


    /* -----------------------------------------------------
       MUSIK LATAR
       File lagu boleh belum tersedia. Bila belum ada,
       tombol disembunyikan tanpa pesan kesalahan.
    ----------------------------------------------------- */

    const audio = document.getElementById("bgMusic");
    const musicButton = document.getElementById("musicToggle");
    const musicLabel = musicButton ? musicButton.querySelector(".music__label") : null;

    let musicReady = false;
    let musicWanted = false;

    const aturTampilanMusik = (sedangDiputar) => {
        if (!musicButton) return;

        musicButton.classList.toggle("is-playing", sedangDiputar);
        musicButton.setAttribute("aria-pressed", sedangDiputar ? "true" : "false");

        const keterangan = sedangDiputar ? "Jeda musik latar" : "Putar musik latar";
        musicButton.setAttribute("aria-label", keterangan);
        musicButton.title = keterangan;

        if (musicLabel) {
            musicLabel.textContent = sedangDiputar ? "Jeda" : "Musik";
        }
    };

    const putarMusik = () => {
        if (!audio || !audio.paused) return;

        const percobaan = audio.play();

        if (percobaan && typeof percobaan.catch === "function") {
            percobaan.catch(() => aturTampilanMusik(false));
        }
    };

    const mulaiMusikBilaSiap = () => {
        if (!audio || !musicReady || !musicWanted) return;
        putarMusik();
    };

    if (audio && musicButton) {
        audio.volume = 0.5;

        audio.addEventListener("canplay", () => {
            if (musicReady) return;
            musicReady = true;
            musicButton.hidden = false;
            mulaiMusikBilaSiap();
        }, { once: true });

        audio.addEventListener("play", () => aturTampilanMusik(true));
        audio.addEventListener("pause", () => aturTampilanMusik(false));
        audio.addEventListener("ended", () => aturTampilanMusik(false));

        audio.addEventListener("error", () => {
            musicReady = false;
            musicWanted = false;
            musicButton.hidden = true;
            aturTampilanMusik(false);
        });

        musicButton.addEventListener("click", () => {
            if (audio.paused) {
                musicWanted = true;
                putarMusik();
            } else {
                musicWanted = false;
                audio.pause();
            }
        });

        /* Bila berkas sudah siap sebelum listener terpasang. */
        if (audio.readyState >= 3) {
            musicReady = true;
            musicButton.hidden = false;
        }
    }


    /* -----------------------------------------------------
       KERTAS KELUAR DARI AMPLOP, LALU MEMBESAR
       Kertas kecil yang keluar dari amplop diukur lebih
       dulu, lalu kertas surat penuh tumbuh dari titik itu.
    ----------------------------------------------------- */

    const siapkanPosisiAwal = () => {
        if (!sheet) return false;

        const asal = suratKecil ? suratKecil.getBoundingClientRect() : null;
        const tujuan = sheet.getBoundingClientRect();

        if (!asal || !asal.width || !asal.height || !tujuan.width || !tujuan.height) {
            return false;
        }

        const skala = Math.min(asal.width / tujuan.width, 1);
        const geserX = (asal.left + asal.width / 2) - (tujuan.left + tujuan.width / 2);
        const geserY = asal.top - tujuan.top;
        const tinggiTerskala = tujuan.height * skala;
        const potongBawah = Math.max(0, Math.min(92, (1 - asal.height / tinggiTerskala) * 100));

        sheet.style.transformOrigin = "50% 0";
        sheet.style.transform = `translate3d(${geserX.toFixed(2)}px, ${geserY.toFixed(2)}px, 0) scale(${skala.toFixed(4)}) rotate(-1.2deg)`;
        sheet.style.clipPath = `inset(0 0 ${potongBawah.toFixed(2)}% 0)`;

        return true;
    };

    const tampilkanIsi = () => {
        if (!opening) return;

        opening.classList.add("is-content");
        body.classList.add("is-opened");

        if (sheet) {
            sheet.style.transition = "none";
            sheet.style.transform = "";
            sheet.style.clipPath = "";
            sheet.style.opacity = "";
        }

        opening.setAttribute("role", "region");
        opening.removeAttribute("aria-modal");
        opening.setAttribute("aria-labelledby", "suratTitle");

        if (letterView) {
            letterView.scrollTop = 0;
        }

        if (sheetTitle) {
            sheetTitle.focus({ preventScroll: true });
        }
    };

    const bentangkanKertas = () => {
        if (!opening) return;

        const pakaiAnimasi = siapkanPosisiAwal();

        /* Pastikan posisi kecil sudah dihitung sebelum transisi dipasang,
           agar kertas benar-benar tumbuh dari ukuran surat di amplop. */
        if (pakaiAnimasi && sheet) {
            void sheet.offsetWidth;
        }

        if (letterView) {
            letterView.setAttribute("aria-hidden", "false");
        }

        opening.classList.add("is-reading");

        if (pakaiAnimasi && sheet) {
            void sheet.offsetWidth;

            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    sheet.style.transform = "translate3d(0px, 0px, 0px) scale(1) rotate(0deg)";
                    sheet.style.clipPath = "inset(0 0 0% 0)";
                });
            });
        }

        const jeda = prefersReduced.matches || !pakaiAnimasi ? 80 : 1320;
        window.setTimeout(tampilkanIsi, jeda);
    };

    let sudahDibuka = false;

    if (openButton && opening) {
        openButton.addEventListener("click", () => {
            if (sudahDibuka) return;
            sudahDibuka = true;

            opening.classList.add("is-opening");
            openButton.disabled = true;

            /* Dipanggil langsung di dalam event klik pengguna agar
               kebijakan autoplay browser terpenuhi. */
            musicWanted = true;
            putarMusik();

            const jeda = prefersReduced.matches ? 180 : 2200;
            window.setTimeout(bentangkanKertas, jeda);
        });
    }


    /* -----------------------------------------------------
       FOTO DAN PLACEHOLDER
       Bila foto belum tersedia, bingkai tetap utuh
       dan menampilkan placeholder yang tenang.
    ----------------------------------------------------- */

    const bingkaiFoto = document.querySelectorAll(".js-photo");

    bingkaiFoto.forEach((bingkai) => {
        const gambar = bingkai.querySelector(".photo__img");
        if (!gambar) return;

        const tandaiTersedia = () => {
            bingkai.classList.add("is-loaded");
            bingkai.classList.remove("is-empty");
            gambar.removeAttribute("aria-hidden");
        };

        const tandaiKosong = () => {
            bingkai.classList.add("is-empty");
            bingkai.classList.remove("is-loaded");
            gambar.setAttribute("aria-hidden", "true");
        };

        gambar.addEventListener("load", () => {
            if (gambar.naturalWidth > 0) {
                tandaiTersedia();
            } else {
                tandaiKosong();
            }
        });

        gambar.addEventListener("error", tandaiKosong);

        if (gambar.complete) {
            if (gambar.naturalWidth > 0) {
                tandaiTersedia();
            } else {
                tandaiKosong();
            }
        }
    });

})();
