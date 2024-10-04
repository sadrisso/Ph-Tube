
const loadCategories = async () =>
{
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await res.json();

    return displayCategories(data.categories);
}


const displayCategories = (data) =>
{
    for (res of data) {
        console.log(res.category)
    }
}

loadCategories();

