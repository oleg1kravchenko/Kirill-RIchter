$(document).ready(function() {


	//nav pages
    $('.menu__list a').click(function(event) {
    event.preventDefault();
    $(".page").fadeOut(0);
    $(".page").removeClass("active");
    var selectTab = $(this).attr("href");
    $(selectTab).addClass("active");
    $(selectTab).fadeIn(200);
  });


//background music
 var audio = document.getElementById('background-audio');
$(".btn-music").click(function() {
    $(this).toggleClass("off");

    if ($(this).hasClass("off")) {
        audio.pause();
    } else {
        audio.muted = false; // снимаем mute
        audio.play().catch(function(error) {
            console.log('Ошибка воспроизведения:', error);
        });
    }
});

	//слайдер
// const API_KEY = "AIzaSyC5uqsw7kj1ZTF3-4yBWNhM46nkpIdFGRo"; // Подставь сюда свой ключ
// const CHANNEL_ID = "UCJBaa2qBvOBhARaJJrzd87g";
// const MAX_RESULTS = 10;

// const CACHE_KEY = "yt_videos_cache";
// const CACHE_TTL = 12 * 60 * 60 * 1000;

// // Преобразуем ISO 8601 в мин:сек
// function formatDuration(isoDuration) {
//   const match = isoDuration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
//   const minutes = match[1] ? parseInt(match[1]) : 0;
//   const seconds = match[2] ? parseInt(match[2]) : 0;
//   return `${minutes}:${seconds.toString().padStart(2,"0")}`;
// }

// // Форматируем дату → "X ago"
// function timeSince(dateStr) {
//   const date = new Date(dateStr);
//   const seconds = Math.floor((new Date() - date) / 1000);
//   const intervals = [
//     { label: "year", seconds: 31536000 },
//     { label: "month", seconds: 2592000 },
//     { label: "day", seconds: 86400 },
//     { label: "hour", seconds: 3600 },
//     { label: "minute", seconds: 60 },
//   ];
//   for (let i=0;i<intervals.length;i++){
//     const interval = Math.floor(seconds / intervals[i].seconds);
//     if(interval >= 1) return `${interval} ${intervals[i].label}${interval>1?"s":""} ago`;
//   }
//   return "just now";
// }

// // Рендерим слайдер с видео
// function renderVideos(data){
//   let html = "";
//   data.items.forEach(video => {
//     html += `
//       <div>
//         <a href="https://www.youtube.com/watch?v=${video.id}" class="item-video" target="_blank">
//           <span class="item-video__thumb">
//             <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}">
//             <span class="item-video__duration">${formatDuration(video.contentDetails.duration)}</span>
//           </span>
//           <span class="item-video__title">${video.snippet.title}</span>
//           <span class="item-video__info">
//             <span class="item-video__views">${video.statistics.viewCount} views</span>
//             <span class="item-video__date">${timeSince(video.snippet.publishedAt)}</span>
//           </span>
//         </a>
//       </div>
//     `;
//   });
//   $(".slider-gallery").html(html);

//   $(".slider-gallery").slick({
//     arrows: true,
//     dots: false,
//     infinite: false,
//     slidesToShow: 2,
//    slidesToScroll: 1,
// 	  prevArrow: '<div class="slick-prev slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z"/></svg><div/>',
// 	  nextArrow: '<div class="slick-next slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"/></svg><div/>',
//       responsive: [
//         { breakpoint: 992, settings: { slidesToShow: 1, variableWidth: true } },
//       ]
//   });
// }

// // Получаем данные из кеша или API
// async function loadYouTubeVideos() {
//   try {
//     // Проверка кеша
//     const cached = localStorage.getItem(CACHE_KEY);
//     if (cached) {
//       const { time, data } = JSON.parse(cached);
//       if (Date.now() - time < CACHE_TTL) {
//         console.log("Используем кешированные данные");
//         return renderVideos(data);
//       }
//     }

//     // 1. Получаем список видео
//     const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&type=video&order=date&maxResults=${MAX_RESULTS}`;
//     const searchResponse = await fetch(searchUrl);
//     const searchData = await searchResponse.json();

//     if (!searchData.items) throw new Error("API не вернул items");

//     const videoIds = searchData.items
//       .filter(item => item.id.videoId)
//       .map(item => item.id.videoId)
//       .join(",");

//     // 2. Получаем детали видео
//     const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,snippet,statistics`;
//     const detailsResponse = await fetch(detailsUrl);
//     const detailsData = await detailsResponse.json();

//     if (!detailsData.items) throw new Error("API не вернул details");

//     // 3. Сохраняем в кеш
//     localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), data: detailsData }));

//     // 4. Рендерим слайдер
//     renderVideos(detailsData);

//   } catch (err) {
//     console.error("Ошибка загрузки видео с YouTube API:", err.message);
//     $(".slider-gallery").html("<p>Не удалось загрузить видео.</p>");
//   }
// }

// // Запускаем
// loadYouTubeVideos();

	$(".input-phone").mask("+7 (999) 999-99-99");


	 // стайлер для select
	 $('select').styler();

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox({
		autoFocus: false,
		backFocus: false,
	});




});


