const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');
let limit = 5;
let page = 1;

async function  getPosts(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}

async function showPosts(){
    const posts = await getPosts();
    posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number"> ${post.id}</div>
    <div class="post-title"> ${post.title}</div>
    <div class="post-body"> ${post.body}</div>
    `

    postsContainer.appendChild(postEl)
    });
    
}

function showLoader(){
    loading.classList.add('show');
    setTimeout(()=>{
        loading.classList.remove('show');
        setTimeout(()=> {
            page++;
            showPosts()
        })
    },1000)
}

function filterPosts(e){
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post=>{
        const title = post.querySelector('.post-title').innerHTML.toUpperCase();
        const body = post.querySelector('.post-body').innerHTML.toUpperCase();

        if(title.indexOf(term) >-1 || body.indexOf(term) > -1){
            post.style.display ='flex';
        }else {
            post.style.display ='none';
        }
    })
}

showPosts();

window.addEventListener('scroll',()=>{
    const {scrollTop ,scrollHeight , clientHeight} = document.documentElement;

    if( (scrollTop + clientHeight)  >= scrollHeight -5){
        console.log(54)
        showLoader()
    }
})

window.addEventListener('input', filterPosts)