var linkPreviewsLi;

// Creating elements to place the link preview
var title = document.createElement("p");
var description = document.createElement("p");
var image = document.createElement("img");
var url = document.createElement("p");

const getBlogposts = () => {
  
  // Collecting urls from blogpost.json
  return fetch("./blogposts.json")
    .then(response => {
      return response.json();
    })
    .then(jsondata => jsondata.Blogposts.forEach(BlogpostUrl => {

      // Access key for the LinkPreview API.
      // Documentation: https://docs.linkpreview.net/
      var data = { key: "26e80a088d88859f01600fdbbb7fabec", q: BlogpostUrl };

      fetch("https://api.linkpreview.net", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then((response) => {

          title.innerHTML = response.title;
          description.innerHTML = response.description;
          image.src = response.image;
          url.innerHTML = response.url;

          linkPreviewsLi = document.querySelector("#linkPreviewsLi");
          linkPreviewsLi.append(title)
          linkPreviewsLi.append(description)
          linkPreviewsLi.append(image)
          linkPreviewsLi.append(url)

          styleBlogPosts();
      });
    }))
}
getBlogposts();