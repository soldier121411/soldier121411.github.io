const projects = {
  project1: { title: '유기견과 놀다가시개 · 포스터 디자인', image: 'img/유기견포스터.png', tools: 'Photoshop · Illustrator', overview: '유기견을 보호하며 사랑하기 위해 만들어진 포스터를 재해석하여 나만의 그래픽 스타일로 리디자인한 작품입니다.' },
  project2: { title: '여름철 모기 예방 · 카드뉴스', image: 'img/모기카드뉴스.png', tools: 'Photoshop · Illustrator · Figma', overview: '팀원들과 함께 여름철 모기 예방을 분석하고, 모기 예방 정보를 가독성과 재미성 높은 비주얼로 풀어낸 카드뉴스 팀 프로젝트입니다.' },
  project3: { title: '피부과광고 · SNS 배너', image: 'img/sns배너디자인.png', tools: 'Photoshop · Illustrator · Figma', overview: '대구 피부과의 유명 병원인 애플피부과의 아이덴티티를 살려, 소비자의 시선을 사로잡고 클릭을 유도하는 SNS 광고 배너를 팀원들과 함께 기획·제작했습니다.' },
  project4: { title: 'FRASH POP · 영상 편집', image: 'img/아이스크림광고디자인.png', pdf: 'cg.pdf', tools: 'Premiere Pro', overview: '아이스크림 광고 영상을 주제로 장면의 흐름과 색보정을 기획한 가상 영상 편집 프로젝트입니다.', video: 'https://youtu.be/LnO5V_QYMv4' },
  project5: { title: '화장품 광고 디자인 · 상세페이지', image: 'img/화장품디자인.png', tools: 'Figma · Photoshop', overview: '실제 기업 공모전 과제를 기반으로 진행한 프로젝트로, 화장품의 기술적 특장점과 유저 편의성을 직관적인 UI/UX로 시각화한 상세페이지 디자인입니다.' },
  project6: { title: '건프라 정보 및 추천 앱 · 웹사이트 디자인', image: 'img/건담디자인사이트.png', website: 'https://soldier121411.github.io/bandai/index.html', pdf: 'ui.pdf', tools: 'Figma', overview: '기존 건프라 관련 앱들의 정보 과다 문제를 개선하기 위해 사용자 맞춤형 필터링과 직관적인 정보성을 도입하여, 원하는 건프라 정보들을 쉽고 빠르게 탐색할 수 있도록 설계한 웹사이트 디자인입니다.' },
  project7: { title: '여행 정보 어플 · UI/UX 앱 디자인', image: 'img/uiux디자인포스터.png', pdf: 'app.pdf', tools: 'Photoshop · Illustrator · Figma', overview: '여행의 유용한 정보들과 소식들을 전달하기 위해, 여행을 즐겨하는 사용자들의 여행 예약과 지도 목록, 여행 일정 저장 등을 전문적인 정보성과 시스템을 도입하여 만들어진 UI/UX 앱 디자인 입니다.' },
  project8: { title: 'ALL NEW RIDE · AI 영상 그래픽', image: 'img/오토바이디자인.png', pdf: 'ai.pdf', tools: 'Premiere Pro · Photoshop', overview: '오토바이 주행 AI 그래픽 영상을 주제로 장면의 역동성과 스릴이 넘치는 이팩트들을 기획한 가상 AI 영상 그래픽 프로젝트입니다.', video: 'https://youtu.be/iiBmDZmvkKg' }
};

// 일반 영상, 공유 주소, 숏츠 주소에서 영상 ID를 찾습니다.
function getYoutubeId(address) {
  const match = address.match(/(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|watch\?(?:[^#]*&)?v=))([a-zA-Z0-9_-]{11})(?=[?&#/]|$)/);
  return match ? match[1] : '';
}

function openModal(projectId) {
  const project = projects[projectId];
  if (!project) return;
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  modal.querySelectorAll('video').forEach(video => video.pause());
  modalBody.innerHTML = `
    <div class="project-intro">
      <p class="project-note">FICTIONAL PROJECT · 가상 프로젝트</p>
      <h2>${project.title}</h2>
      ${project.pdf ? `<div class="project-actions">
        <a class="btn" href="${project.pdf}" target="_blank" rel="noopener noreferrer">${project.title} PDF 열기</a>
      </div>` : ''}
      <p>${project.overview}</p>
      <p class="project-tools">제작 도구: ${project.tools}</p>
      ${projectId === 'project6' ? `<div class="project-actions">
        ${project.website ? `<a class="btn" href="${project.website}" target="_blank" rel="noopener noreferrer">웹사이트 보기</a>` : '<button type="button" class="btn" disabled>웹사이트 보기 · 주소 연결 예정</button>'}
      </div>` : ''}
      ${project.video ? `<div class="project-actions" aria-label="프로젝트 보기 선택">
        <button type="button" class="btn" id="detail-view-button" aria-pressed="true" onclick="showProjectView('detail')">상세페이지 보기</button>
        <button type="button" class="btn" id="video-view-button" aria-pressed="false" onclick="showProjectView('video')">영상 보기</button>
      </div>` : ''}
    </div>
    <div id="project-detail-view">
      <img src="${project.image}" alt="${project.title} 가상 프로젝트 상세 디자인" class="project-detail-image">
    </div>
    ${project.video ? `<div id="project-video-view" class="video-modal-container" hidden>
      <h3>${project.title} · 영상 보기</h3>
      <iframe data-src="https://www.youtube.com/embed/${getYoutubeId(project.video)}" title="${project.title} 영상" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <a class="btn" href="${project.video}" target="_blank" rel="noopener noreferrer">유튜브에서 영상 보기</a>
    </div>` : ''}
    <div class="modal-btn-wrap"><button class="modal-close-btn" onclick="closeModal()">닫기</button></div>
  `;
  modal.classList.add('active');
  modal.querySelector('.modal-content').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function showProjectView(view) {
  const detail = document.getElementById('project-detail-view');
  const video = document.getElementById('project-video-view');
  if (!detail || !video) return;
  const showVideo = view === 'video';
  detail.hidden = showVideo;
  video.hidden = !showVideo;
  document.getElementById('detail-view-button').setAttribute('aria-pressed', String(!showVideo));
  document.getElementById('video-view-button').setAttribute('aria-pressed', String(showVideo));
  const youtube = video.querySelector('iframe');
  if (showVideo) {
    if (!youtube.getAttribute('src')) youtube.src = youtube.dataset.src;
  } else {
    youtube.removeAttribute('src');
  }
}
function closeModal() {
  const modal = document.getElementById('modal');
  modal.querySelectorAll('video').forEach(video => video.pause());
  modal.classList.remove('active');
  modal.querySelectorAll('iframe').forEach(frame => frame.removeAttribute('src'));
  document.body.style.overflow = 'auto';
}

function closeModalOnOutside(event) {
  if (event.target.id === 'modal') {
    closeModal();
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

const backToTopBtn = document.getElementById("backToTop");
window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
