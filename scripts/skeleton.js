//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('/html/topNav.html'));
    console.log($('#footerPlaceholder').load('/html/bottomNav.html'));
    // console.log($('#addPlaceholder').load('/html/reusable-content/add.html'));
}
loadSkeleton();  //invoke the function