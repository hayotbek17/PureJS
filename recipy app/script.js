const meals =document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals')
getRandomMeal();


async function getRandomMeal(){
const randomMeal= await fetch('https://www.themealdb.com/api/json/v1/1/random.php').then((res)=>res.json().then((data)=>data.meals[0]))
addMeal(randomMeal,true)

}
async function getMealById(id){
const meal= await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+ id ).then((res)=> res.json().then((data)=>{
  return data.meals[0];
}))

return meal
}
async function getMealBySearch(term){
const meals= await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'+term)
}


 addMeal=(mealData,random=false)=>{
    const meal = document.createElement('div')
    meal.classList.add('meal')

    meal.innerHTML=`

          <div class="meal-header">
          ${random?
            
           ` <spam class="random">
              Random Recipe
            </spam>`
            
            :''
        }
            <img
             src="${mealData.strMealThumb}" 
             alt="${mealData.strMeal}">
          </div>
          <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
              <i class="fas fa-heart"></i>
            </button>
          
        </div>`

        const btn = meal.querySelector('.meal-body   .fav-btn')
        btn.addEventListener('click',()=>{

   if(btn.classList.contains('active')){
     removeMealFromLs(mealData.idMeal)
     btn.classList.remove('active');
   }
  
   else {
     
     addMealToLs(mealData.idMeal)
     btn.classList.add('active');
    }
    fetchFavMeals()
        
        })
   
   
    meals.appendChild(meal)
  }



//Bu funksiya parametrida kelayotgan id ni localStorage ga set qilayapti
addMealToLs=(mealId)=>{
const mealIds = getMealsFromLs()
localStorage.setItem('mealIds',JSON.stringify([...mealIds,mealId]))
}

// Bu funksiya localStorege dagi malumotlarni olib return qilib beradi 
getMealsFromLs=()=>{
const mealIds= JSON.parse(localStorage.getItem('mealIds'));
return mealIds === null ? [] : mealIds
}

console.log();
// Bu funksiya parametrida kelayotgan idni localStoregedagi Arraydan filtir qilib qoganini Localga set qiladi 
removeMealFromLs=(mealId)=>{
const mealIds= getMealsFromLs()

localStorage.setItem('mealIds',JSON.stringify(mealIds.filter(id=>id!==mealId)))
}


async function fetchFavMeals() {
    
  favoriteContainer.innerHTML = "";

  const mealIds= getMealsFromLs() //=>[2,3,2,4,3,]
  for(let i=0;i<mealIds.length;i++){
   const mealId =mealIds[i]
    meal = await getMealById(mealId)
  
    addMealToFav(meal)
    
  }


}

fetchFavMeals();



addMealToFav = (mealData) => {



  
    const favMeal = document.createElement('li')

  favMeal.innerHTML = `

         <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"><span>${mealData.strMeal.slice(0, 7).padEnd(10, '...')}</span>
         <button class='close'>
         <i class="fa-solid fa-rectangle-xmark"></i>
         </button>
         `;

  const btn = favMeal.querySelector('.close')

  btn.addEventListener('click', () => {
    removeMealFromLs(mealData.idMeal)

    fetchFavMeals()

  })

  favoriteContainer.appendChild(favMeal)

  }