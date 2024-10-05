
const loadCategories = async () =>
{
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await res.json();

    return displayCategories(data.categories);
}

const loadVideos = async () =>
    {
        const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/videos");
        const data = await res.json();

        return displayVideos(data.videos)
    }

const removeActiveClass = () =>
{
    const buttons = document.getElementsByClassName("category-btn")
    console.log(buttons)

    for (let btn of buttons) {
        btn.classList.remove("active")
    }
}

const loadCategorieVideos = async (id) =>
{
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();

    removeActiveClass();

    const activeBtn = document.getElementById(`btn-${id}`)
    activeBtn.classList.add("active");

    displayVideos(data.category);
}


const displayCategories = (data) =>
{
    const categoryContainer = document.getElementById("categories");

    //try to display using forOf
    for (res of data)
    {
        console.log(res.category)
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <button class="category-btn btn mr-3" id="btn-${res.category_id}" onclick="loadCategorieVideos(${res.category_id})">${res.category}</button>
        `
        categoryContainer.append(buttonContainer)
    }
}


const displayVideos = (videos) =>
{
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";

    if (videos.length === 0) {
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
            <div class="min-h-96 flex flex-col gap-5 items-center justify-center">
                <img src="ph-tube-resources/Icon.png" />
                <h2 class="text-center font-bold text-4xl">No content here in this category</h2>
            </div>
        `;
        return;
    }
    else {
        videoContainer.classList.add("grid");
    }

    //try to display using forEach
    videos.forEach((video) =>
    {
        console.log(video)
        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img
                src=${video.thumbnail}
                alt="Thumbnail" class="h-full w-full object-cover" />
                ${video.others.posted_date?.length === 0 ? "" : `<span class="absolute bottom-2 right-2 bg-black text-white">${video.others.posted_date}</span>}`}
            </figure>
            <div class="py-2 flex gap-4 items-center">
                <div class="">
                    <img src="${video.authors[0].profile_picture}" class="w-10 h-10 rounded-full" />
                </div>
                <div">
                    <h2 class="card-title font-bold font-serif">${video.title}</h2>
                    <div class="flex gap-2 items-center">
                        <p class="text-gray-400">${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified === true ? '<img src="https://cdn4.iconfinder.com/data/icons/ui-solic/24/Verified-256.png" class="w-4 h-4" />' : ""}
                        <p class="text-gray-600">${video.others.views}</p>
                    </div>
                    <p></p>
                </div>
            </div>
        `

        videoContainer.append(card);
    })
}

loadCategories();
loadVideos();

