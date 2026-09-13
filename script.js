const scenes = [...document.querySelectorAll(".scene")];
const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const musicNotice = document.getElementById("musicNotice");

let currentPage = 1;

function showPage(page) {
  currentPage = page;

  scenes.forEach(scene => {
    scene.classList.toggle("active", Number(scene.dataset.page) === page);
  });

  // Long pages start at the top every time they are opened.
  const current = document.querySelector(`.scene[data-page="${page}"]`);
  if (current && current.classList.contains("tall")) {
    current.scrollTop = 0;
  }

  window.scrollTo(0, 0);
}

function startMusic() {
  if (!music) return;
  music.play()
    .then(() => {
      musicButton.classList.add("playing");
      musicButton.textContent = "❚❚ MUSIC";
      musicNotice.classList.add("hide");
    })
    .catch(() => {
      // Browser requires a user gesture or music.mp3 is missing.
    });
}

function toggleMusic() {
  if (!music) return;

  if (music.paused) {
    startMusic();
  } else {
    music.pause();
    musicButton.classList.remove("playing");
    musicButton.textContent = "♫ MUSIC";
  }
}

document.querySelectorAll(".hotspot").forEach(button => {
  const go = Number(button.dataset.go);

  const activate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    showPage(go);

    // The first user tap can also unlock background music.
    if (music && music.paused) startMusic();
  };

  button.addEventListener("click", activate);
  button.addEventListener("touchend", activate, { passive: false });
});

musicButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  toggleMusic();
});

// If the user taps anywhere on the opening/menu artwork, don't force music,
// but the dedicated music button will always work.
window.addEventListener("load", () => {
  setTimeout(() => musicNotice.classList.add("hide"), 4500);
});
