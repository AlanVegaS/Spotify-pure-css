const layoutLibrary = document.querySelector('.library-content')
const selectGrid = document.querySelector('.select-grid')
const selectList = document.querySelector('.select-list')
const transformLargeLibrary = document.querySelector('.transfor-large-library .fa-arrow-right')
let isLibraryGrid = false
let isLibraryLarge = false

selectGrid.addEventListener('click', event => {
    gridLibrary()
})
function gridLibrary() {
    layoutLibrary.classList.replace('column', 'grid')
    selectGrid.classList.add('hidden')
    selectList.classList.remove('hidden')
    isLibraryGrid = true
}
selectList.addEventListener('click', event => {
    columnLibrary()
})
function columnLibrary() {
    layoutLibrary.classList.replace('grid', 'column')
    selectGrid.classList.remove('hidden')
    selectList.classList.add('hidden')
    isLibraryGrid = false
}

const iconCompactLibrary = document.querySelector('.transform-compact-library')
iconCompactLibrary.addEventListener('click', event => {
    CompactLibrary()
})
function CompactLibrary() {
    let toggleLayout = document.body.classList.toggle('compact-library')
    console.log(isLibraryLarge);
    if(!toggleLayout){
        if(isLibraryLarge)
            LargeLibrary(!isLibraryLarge)
        if(isLibraryGrid)
            layoutLibrary.classList.replace('column', 'grid')
        else 
            layoutLibrary.classList.replace('grid', 'column')
    } else {
        layoutLibrary.classList.remove('grid')
        layoutLibrary.classList.add('column')
        document.body.classList.remove('library-large')
        transformLargeLibrary.classList.remove('fa-rotate-180')
    }
}

const updateGrid = () => {
    let rowcontainers = Array.from(document.querySelectorAll('.row-content .library-content'))
    let containerWidth = rowcontainers[0].clientWidth;
    let bodyWidth = document.body.clientWidth
    rowcontainers.forEach((element, i) => {
        let articleCount = 0
        let itemWidth = element.childNodes[1].clientWidth;
        for (let index = 0; index < element.childNodes.length; index++) {
            let item = element.childNodes[index]
            if(item.nodeName === 'ARTICLE'){
                let itemsPerRow = Math.floor(containerWidth / itemWidth);
                if(itemsPerRow > 0){
                    if (articleCount < itemsPerRow)
                        item.classList.remove('hidden');
                    else 
                        item.classList.add('hidden');
                }
                articleCount++
            }
        }
    })
    console.log(bodyWidth);
};
const iconLargeLibrary = document.querySelector('.transfor-large-library')
iconLargeLibrary.addEventListener('click', event => {
    isLibraryLarge = transformLargeLibrary.classList.contains('fa-rotate-180')
    LargeLibrary(isLibraryLarge)
    isLibraryLarge = !isLibraryLarge
    updateGrid();
})
function LargeLibrary(isLibraryLarge) {
    if(isLibraryLarge){
        transformLargeLibrary.classList.remove('fa-rotate-180')
        document.body.classList.remove('library-large')
        layoutLibrary.classList.add('column')
        layoutLibrary.classList.remove('grid')
        selectGrid.classList.remove('hidden')
        selectList.classList.add('hidden')
        isLibraryGrid = true
    } else {
        transformLargeLibrary.classList.add('fa-rotate-180')
        document.body.classList.add('library-large')
        layoutLibrary.classList.remove('column')
        layoutLibrary.classList.add('grid')
        selectGrid.classList.add('hidden')
        selectList.classList.remove('hidden')
        isLibraryGrid = false
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', updateGrid);
    updateGrid();
});