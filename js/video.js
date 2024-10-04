
const loadCategories = async () =>
{
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await res.json();

    return displayCategories(data.categories);
}


const displayCategories = (data) =>
{
    const categoryContainer = document.getElementById("categories");

    //try to display using forOf
    for (res of data)
    {
        console.log(res.category)
        const button = document.createElement("button");
        button.classList = "btn btn-info mx-4";
        button.innerText = res.category;

        categoryContainer.append(button)
    }
}

const loadVideos = async () =>
{
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/videos");
    const data = await res.json();

    return displayVideos(data.videos)
}


const displayVideos = (videos) =>
{
    const videoContainer = document.getElementById("videos");

    //try to display using forEach
    videos.forEach((video) =>
    {
        console.log(video)
        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML = `
            <figure>
                <img
                src=${video.thumbnail}
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `

        videoContainer.append(card);
    })
}

loadCategories();
loadVideos();

