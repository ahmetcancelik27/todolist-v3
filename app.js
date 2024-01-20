//// MAIN ELEMENT
const biggestContainer = document.querySelector('.biggest_container')
const allTodoContainer = document.querySelector('.all_todo_container')

const mainForm = document.querySelector('.main_todo_form')
console.log(mainForm)
const mainInput = document.querySelector('.main_todo_input')
console.log(mainInput)
const emptyList = document.querySelector('.empty-list')
console.log(emptyList)

function tarihSaat() {
  let date = new Date()
  let hour = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  let dayNumber = date.getDay()
  let month = date.getMonth()
  let year = date.getFullYear()

  hour = hour < 10 ? '0' + hour : hour
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  month = month < 1 ? '0' + (month + 1) : month
  dayNumber = dayNumber < 10 ? '0' + dayNumber : dayNumber

  document.querySelector('.hour').innerHTML = `${hour}: ${minutes}: ${seconds}`
  document.querySelector('.date').innerHTML = `${dayNumber}/${month}/${year} `
}

setInterval(tarihSaat, 1000)

const subHtml = (subTodo) => {
  const subEl = `

            <div class="sub_todo">
              <div class="sub_todo_left">
                <input type="checkbox" class="sub_todo_cb" />
                <span class="sub_todo_text">${subTodo.text}</span>
              </div>
              <div class="sub_todo-right">
                <button class="sub_todo_delete">Delete</button>
              </div>
                          </div>

              `
  return subEl
}

const createMainHtml = (mainTodo) => {
  const html = `${
    mainTodo.subtext
      ? `<div class="each_todo_element">
          <div class="main_todo_element">
            <div class="main_todo_left">
            ${
              mainTodo.isCompleted
                ? `<input type="checkbox" checked class="main_todo_cb" />`
                : `<input type="checkbox" class="main_todo_cb" />`
            }
              
              <span class="main_todo_text">${mainTodo.text}</span>
              

            </div>
            <div class="main_todo_right">
              <form class="sub_todo_form">
                <div class="sub_todo_div">
                  <input
                    type="text"
                    placeholder="type here..."
                    class="sub_todo_input"
                  />
                  <button type="submit" class="add_sub_todo_button">+</button>
                </div>
              </form>
              <button class="main_todo_save">Save</button>
              <button class="main_todo_edit">Edit</button>
              <button class="main_todo_delete">Delete</button>
            </div>
          </div>
          <div class="sub_todo_container displaying">
        
          ${mainTodo.subtext
            .map(
              (sub) => `
            <div class="sub_todo">
              <div class="sub_todo_left">
              ${
                sub.isCompleted2
                  ? `<input type="checkbox" checked class="sub_todo_cb" />`
                  : `<input type="checkbox" class="sub_todo_cb" />`
              }
                
                <span class="sub_todo_text">${sub.text}</span>
              </div>
              <div class="sub_todo-right">
                <button class="sub_todo_delete">Delete</button>
              </div>
            </div>
  `
            )
            .join(' ')}
          </div>
          `
      : `<div class="each_todo_element">
          <div class="main_todo_element">
            <div class="main_todo_left">
              <input type="checkbox" class="main_todo_cb" />
              <span class="main_todo_text">${mainTodo.text}</span>
            </div>
            <div class="main_todo_right">
              <form class="sub_todo_form">
                <div class="sub_todo_div">
                  <input
                    type="text"
                    placeholder="type here..."
                    class="sub_todo_input"
                  />
                  <button type="submit" class="add_sub_todo_button">+</button>
                </div>
              </form>
              <button class="main_todo_save">Save</button> 
              <button class="main_todo_edit">Edit</button>
              <button class="main_todo_delete">Delete</button>
            </div>
          </div>
          </div>`
  }`
  return html
}

const startConf = () => {
  const todos = JSON.parse(localStorage.getItem('todos'))

  // todos.forEach((todo) => console.log(todo.subtext))
  if (!todos) {
    localStorage.setItem('todos', JSON.stringify([]))
  } else {
    todos.forEach((todo) => {
      allTodoContainer.insertAdjacentHTML('beforeend', createMainHtml(todo))
    })
  }
}

startConf()

const todos = JSON.parse(localStorage.getItem('todos'))
console.log(todos)

const emptylistCheck = (todos) => {
  if (todos[0]) emptyList.style.display = 'none'
  if (!todos[0]) emptyList.style.display = 'inline'
}

emptylistCheck(todos)

const checkingExistValue = (el1, el2) => {
  const values = el2.map((el) => el.text)
  console.log(values)
  const check = values.includes(el1)
  console.log(check)
  return check
}

const addTodo = (e) => {
  e.preventDefault()
  mainEl = mainInput.value
  const mainTodo = {
    text: mainEl,
    isCompleted: false,
    subtext: [],
  }

  if (mainEl === '') {
    // boş değer girilmeye çalışıyor ise hata veriyoruz
    mainInput.style.border = '1px solid gray'

    setTimeout(() => {
      mainInput.style.borderColor = 'transparent'
    }, 2000)
    return false
  }
  const todos = JSON.parse(localStorage.getItem('todos'))

  if (checkingExistValue(mainEl, todos)) {
    alert('It already exist')
    return false
  }

  todos.push(mainTodo)

  localStorage.setItem('todos', JSON.stringify(todos))
  // console.log(todos)

  allTodoContainer.insertAdjacentHTML('beforeend', createMainHtml(mainTodo))

  mainInput.value = ' '
  emptyList.remove()
  // location.reload()
}

mainForm.addEventListener('submit', addTodo)

///// ADD TO DO SUB

const subForms = document.querySelectorAll('.sub_todo_form')
const subTodoInputs = document.querySelectorAll('.sub_todo_input')

const secondAddTodo = (e) => {
  e.preventDefault()
  let inputVal = e.target.children[0].children[0].value
  let inputEl = e.target.children[0].children[0]
  const subTodoContainer = e.target.closest('.sub_todo_container')
  const subTodo = {
    text: inputVal,
    isCompleted2: false,
  }

  if (inputVal == '') {
    // boş değer girilmeye çalışıyor ise hata veriyoruz
    inputEl.style.border = '1px solid black'

    setTimeout(() => {
      inputEl.style.borderColor = 'transparent'
    }, 2000)
    return false
  }

  // Canceling Main Checkbox Checked
  const mainCb = e.target.parentNode.previousElementSibling.children[0]
  mainCb.checked = false

  const mainTodo = e.target.parentNode.parentNode.nextElementSibling
  // console.log(mainTodo)
  const mainTodoText =
    e.target.parentNode.parentNode.children[0].children[1].textContent

  // const mainEl =
  //   e.target.parentNode.parentNode.children[0].children[1].textContent

  /// Local storagedan maintodo yu seçip ona sub element ekleme

  const todos = JSON.parse(localStorage.getItem('todos'))

  const filteredTodos = todos.filter((todo) => todo.text === mainTodoText)

  let isCompletedStuation = filteredTodos[0].isCompleted

  if (isCompletedStuation) {
    filteredTodos.forEach((todo) => (todo.isCompleted = !isCompletedStuation))
  } else {
    filteredTodos.forEach((todo) => (todo.isCompleted = isCompletedStuation))
  }

  filteredTodos.forEach((todo) => todo.subtext.push(subTodo))

  localStorage.setItem('todos', JSON.stringify(todos))

  mainTodo.insertAdjacentHTML('beforeend', subHtml(subTodo))
  mainTodo.classList.remove('displaying')

  inputEl.value = ' '
  inputEl.placeholder = 'type here'

  // location.reload()
}

subForms.forEach((sub) => sub.addEventListener('submit', secondAddTodo))

/////// BUTTONS : EDIT, DELETE , SAVE

//  MAIN EDIT BUTTONS

const handlingMainEditBtns = (e) => {
  // Showing Save Button
  const targetingSaveBtn = e.target.previousElementSibling
  targetingSaveBtn.style.display = 'inline'

  // Hiding Edit and Delete Buttons
  const targetingDeleteBtn = e.target.nextElementSibling
  targetingDeleteBtn.style.display = ' none'
  e.target.style.display = 'none'

  const targetingMainTodo = e.target.closest('.main_todo_element')
  // The Element which are going to be hide

  const subAddInput = targetingMainTodo.children[1].children[0]
  subAddInput.style.display = 'none'
  console.log(subAddInput)

  const replaceSpanInput = targetingMainTodo.children[0]

  // New Input
  const targetingSpan = targetingMainTodo.children[0].children[1]
  console.log(targetingSpan)
  // targetingSpan.style.fontSize = '18px'
  const savingOldSpanText = targetingSpan.textContent
  console.log(savingOldSpanText)

  const todos = JSON.parse(localStorage.getItem('todos'))

  // Saving subs elements

  const selectingEl = todos.filter((todo) => todo.text === savingOldSpanText)
  const selectingSubs = selectingEl.subtext
  console.log(selectingSubs)

  // Getting All Items From Local Storage

  const newInput = document.createElement('input')

  newInput.value = savingOldSpanText
  newInput.style.padding = '2px'
  newInput.style.marginLeft = '50px'
  newInput.style.width = '120px'

  replaceSpanInput.append(newInput)
  newInput.focus()
  // targetingSpan.remove()
  // const restElements = todos.filter((todo) => todo.text !== savingOldSpanText)

  // localStorage.setItem('todos', JSON.stringify(restElements))
  // // console.log(savingOldSpanText)
}

const allMainEditBtns = document.querySelectorAll('.main_todo_edit')

allMainEditBtns.forEach((edBtns) =>
  edBtns.addEventListener('click', handlingMainEditBtns)
)

// MAIN SAVE BUTTON

const allSaveBtns = document.querySelectorAll('.main_todo_save')

const handlingMainSaveBtns = (e) => {
  const targetingMainTodo = e.target.closest('.main_todo_element')
  console.log(' targetingMainTodo ', targetingMainTodo)
  const targetingSpanValue =
    targetingMainTodo.children[0].children[1].textContent
  let targetingSpan = targetingMainTodo.children[0].children[1]
  console.log('targetingSpanValue ', targetingSpanValue)
  const targetingNewInputValue = targetingMainTodo.children[0].children[2].value
  console.log(targetingNewInputValue)
  const targetingNewInput = targetingMainTodo.children[0].children[2]
  console.log(targetingNewInput)

  console.log('targetingNewInputValue ', targetingNewInputValue)

  const todos = JSON.parse(localStorage.getItem('todos'))
  let filterTodos = todos.filter((todo) => todo.text === targetingSpanValue)
  if (checkingExistValue(targetingNewInputValue, todos)) {
    alert('It already exist')
    const showingEditButton = targetingMainTodo
    showingEditButton.querySelector('.main_todo_edit').style.display = 'inline'
    const showingDeleteButton = targetingMainTodo
    showingDeleteButton.querySelector('.main_todo_delete').style.display =
      'inline'
    const showingSubTodoInput = targetingMainTodo.children[1].children[0]
    showingSubTodoInput.style.display = 'inline'
    targetingSpan.textContent = targetingSpan.textContent
    // targetingSpan.style.fontSize = "2rem"
    e.target.style.display = 'none'
  }

  if (!checkingExistValue(targetingNewInputValue, todos)) {
    filterTodos[0].text = targetingNewInputValue
    const showingEditButton = targetingMainTodo
    showingEditButton.querySelector('.main_todo_edit').style.display = 'inline'
    const showingDeleteButton = targetingMainTodo
    showingDeleteButton.querySelector('.main_todo_delete').style.display =
      'inline'
    const showingSubTodoInput = targetingMainTodo.children[1].children[0]
    showingSubTodoInput.style.display = 'inline'

    e.target.style.display = 'none'
    targetingSpan.textContent = targetingNewInputValue
    // targetingSpan.style.fontSize = '2rem'
  }

  if (targetingNewInputValue === '') {
    // boş değer girilmeye çalışıyor ise hata veriyoruz
    targetingNewInput.style.border = '1px solid gray'
    targetingNewInput.placeholder = 'type something'
    setTimeout(() => {
      targetingNewInput.style.borderColor = 'transparent'
    }, 2000)
    return false
  }

  localStorage.setItem('todos', JSON.stringify(todos))

  // targetingSpan.textContent = targetingNewInputValue
  targetingNewInput.remove()
}

allSaveBtns.forEach((saveBtns) =>
  saveBtns.addEventListener('click', handlingMainSaveBtns)
)

// MAIN DELETE BUTTON

const allMainDeleteBtns = document.querySelectorAll('.main_todo_delete')
console.log(allMainDeleteBtns)

const handlingMainDeleteBtns = (e) => {
  const eachTodo = e.target.closest('.each_todo_element')
  const mainTodo = e.target.closest('.main_todo_element')
  const mainTodoText = mainTodo.querySelector('.main_todo_text').textContent

  let todos = JSON.parse(localStorage.getItem('todos'))

  todos = todos.filter((todo) => todo.text !== mainTodoText)
  localStorage.setItem('todos', JSON.stringify(todos))

  eachTodo.remove()
}

allMainDeleteBtns.forEach((dlt) =>
  dlt.addEventListener('click', handlingMainDeleteBtns)
)

// SUB DELETE BUTTON

const allSubDeleteBtns = document.querySelectorAll('.sub_todo_delete')
console.log(allSubDeleteBtns)

const handlingSubDeleteBtns = (e) => {
  const subTodoEl = e.currentTarget.closest('.sub_todo')
  // console.log(subTodoEl)
  const mainTodoVal = e.currentTarget
    .closest('.each_todo_element')
    .querySelector('.main_todo_text').textContent
  // console.log('mainTodoVal', mainTodoVal)
  const subTodoValue = subTodoEl.querySelector('.sub_todo_text').textContent
  // console.log('subTodoValue', subTodoValue)

  let todos = JSON.parse(localStorage.getItem('todos'))
  const mainEl = todos.filter((td) => td.text === mainTodoVal)
  console.log(mainEl)
  let subEls = mainEl[0].subtext
  console.log(subEls)
  subEls = subEls.filter((td) => td.text !== subTodoValue)
  console.log(subEls)

  mainEl[0].subtext = subEls
  console.log(mainEl)
  console.log(todos)

  localStorage.setItem('todos', JSON.stringify(todos))
  console.log(todos)

  // console.log(mainTodoFromLocalStorage)
  subTodoEl.remove()
}

allSubDeleteBtns.forEach((dlt) =>
  dlt.addEventListener('click', handlingSubDeleteBtns)
)

// CHECKBOXES

// MAıN CHECKBOXES
const allMainCheckBoxes = document.querySelectorAll('.main_todo_cb')
console.log(allMainCheckBoxes)

const handlingMainCheckboxes = (e) => {
  const mainTodoText = e.target.nextElementSibling.textContent
  const eachTodo = e.target.closest('.each_todo_element')
  const mainTodoCb = e.target
  console.log(mainTodoCb)
  const subCheckboxes = eachTodo.querySelectorAll('.sub_todo_cb')
  console.log(subCheckboxes)
  let todos = JSON.parse(localStorage.getItem('todos'))
  todos.forEach((td) => {
    if (td.text === mainTodoText) {
      ;(td.isCompleted = !td.isCompleted),
        td.subtext.forEach((std) => {
          if (td.isCompleted) {
            std.isCompleted2 = true
          } else {
            std.isCompleted2 = false
          }
        })
    }
  })
  if (mainTodoCb.checked) {
    subCheckboxes.forEach((sub) => (sub.checked = true))
  } else {
    subCheckboxes.forEach((sub) => (sub.checked = false))
  }

  localStorage.setItem('todos', JSON.stringify(todos))
}

allMainCheckBoxes.forEach((mainCb) =>
  mainCb.addEventListener('click', handlingMainCheckboxes)
)

//// DISPLAYIN OR HIDING SUB ELEMENTS

// console.log(mainTodoText)

// mainTodoText.forEach((main) => {
//   console.log(main.textContent)
// })
// const eachTodoElement = document.querySelectorAll('.each_todo_element')
const mainTodoText = document.querySelectorAll('.main_todo_text')

mainTodoText.forEach((main) => {
  main.addEventListener('click', function (e) {
    // const mainEl = e.target.parentNode.parentNode.children[0].children[1]
    // console.log(mainEl)
    const eachTodoContainer = e.target.closest('.each_todo_element')
    const subTodos = eachTodoContainer.children[1]

    let todos = JSON.parse(localStorage.getItem('todos'))
    // todos = todos.filter((td) => console.log(td.subtext))

    subTodos.classList.toggle('displaying')
  })
})

// SUB CHECKBOXES

const allSubTodoCbs = document.querySelectorAll('.sub_todo_cb')
console.log(allSubTodoCbs)

const handlingSubcheckBoxes = (e) => {
  const eachTodo = e.target.closest('.each_todo_element')
  const mainTodoText = eachTodo.querySelector('.main_todo_text').textContent
  console.log(mainTodoText)
  const mainCb = e.target
    .closest('.sub_todo_container')
    .previousElementSibling.querySelector('.main_todo_cb')
  console.log(mainCb)
  const subTodoContainer = e.target.closest('.sub_todo_container')
  const allSubCbs = subTodoContainer.querySelectorAll('.sub_todo_cb')
  const allSubText = e.target.nextElementSibling.textContent
  let todos = JSON.parse(localStorage.getItem('todos'))

  // FROM SUBCB TO MAIN CB
  const MainElFromLclStrg = todos.filter((td) => td.text === mainTodoText)
  const subElsFromLclStrg = MainElFromLclStrg[0].subtext

  subElsFromLclStrg.filter((sub) => {
    if (sub.text === allSubText) {
      sub.isCompleted2 = !sub.isCompleted2
    }
  })
  // allSubCbs.forEach((subCb) => {
  //   if (subCb.checked) {
  //     subElsFromLclStrg.forEach((subEl) => {
  //       if (subEl.text === allSubText) console.log(subEl)
  //     })
  //   } else {
  //     subElsFromLclStrg.forEach((subEl) => (subEl.isCompleted2 = false))
  //   }
  // })

  // FROM MAINCB TO SUB CB

  const allCbs = []
  const allCbsValues = allSubCbs.forEach((sub) => allCbs.push(sub.checked))
  const allTrues = (allCbs) => allCbs === true
  const checkingSubCbs2 = allCbs.every(allTrues)

  if (checkingSubCbs2) {
    mainCb.checked = true
    MainElFromLclStrg[0].isCompleted = true
  } else {
    mainCb.checked = false
    MainElFromLclStrg[0].isCompleted = false
  }

  localStorage.setItem('todos', JSON.stringify(todos))
}

allSubTodoCbs.forEach((sub) =>
  sub.addEventListener('click', handlingSubcheckBoxes)
)

/*
//// MAIN ELEMENT

const biggestContainer = document.querySelector('.biggest_container')
const allTodoContainer = document.querySelector('.all_todo_container')

const mainForm = document.querySelector('.main_todo_form')
const mainInput = document.querySelector('.main_todo_input')

const subHtml = (subTodo) => {
  const subEl = `

            <div class="sub_todo">
              <div class="sub_todo_left">
                <input type="checkbox" class="sub_todo_cb" />
                <span class="sub_todo_text">${subTodo.text}</span>
              </div>
              <div class="sub_todo-right">
                <button class="sub_todo_delete">Delete</button>
              </div>
                          </div>

              `
  return subEl
}

const createMainHtml = (mainTodo) => {
  const html = `${
    mainTodo.subtext
      ? `<div class="each_todo_element">
          <div class="main_todo_element">
            <div class="main_todo_left">
            ${
              mainTodo.isCompleted
                ? `<input type="checkbox" checked class="main_todo_cb" />`
                : `<input type="checkbox" class="main_todo_cb" />`
            }
              
              <span class="main_todo_text">${mainTodo.text}</span>
              

            </div>
            <div class="main_todo_right">
              <form class="sub_todo_form">
                <div class="sub_todo_div">
                  <input
                    type="text"
                    placeholder="type here..."
                    class="sub_todo_input"
                  />
                  <button type="submit" class="add_sub_todo_button">+</button>
                </div>
              </form>
              <button class="main_todo_save">Save</button>
              <button class="main_todo_edit">Edit</button>
              <button class="main_todo_delete">Delete</button>
            </div>
          </div>
          <div class="sub_todo_container displaying">
        
          ${mainTodo.subtext
            .map(
              (sub) => `
            <div class="sub_todo">
              <div class="sub_todo_left">
              ${
                sub.isCompleted2
                  ? `<input type="checkbox" checked class="sub_todo_cb" />`
                  : `<input type="checkbox" class="sub_todo_cb" />`
              }
                
                <span class="sub_todo_text">${sub.text}</span>
              </div>
              <div class="sub_todo-right">
                <button class="sub_todo_delete">Delete</button>
              </div>
            </div>
  `
            )
            .join(' ')}
          </div>
          `
      : `<div class="each_todo_element">
          <div class="main_todo_element">
            <div class="main_todo_left">
              <input type="checkbox" class="main_todo_cb" />
              <span class="main_todo_text">${mainTodo.text}</span>
            </div>
            <div class="main_todo_right">
              <form class="sub_todo_form">
                <div class="sub_todo_div">
                  <input
                    type="text"
                    placeholder="type here..."
                    class="sub_todo_input"
                  />
                  <button type="submit" class="add_sub_todo_button">+</button>
                </div>
              </form>
              <button class="main_todo_save">Save</button> 
              <button class="main_todo_edit">Edit</button>
              <button class="main_todo_delete">Delete</button>
            </div>
          </div>
          </div>`
  }`
  return html
}

const startConf = () => {
  const todos = JSON.parse(localStorage.getItem('todos'))

  // todos.forEach((todo) => console.log(todo.subtext))
  if (!todos) {
    localStorage.setItem('todos', JSON.stringify([]))
  } else {
    todos.forEach((todo) => {
      allTodoContainer.insertAdjacentHTML('beforeend', createMainHtml(todo))
    })
  }
}

startConf()

const checkingExistValue = (el1, el2) => {
  const values = el2.map((el) => el.text)
  console.log(values)
  const check = values.includes(el1)
  console.log(check)
  return check
}

const addTodo = (e) => {
  e.preventDefault()
  mainEl = mainInput.value
  const mainTodo = {
    text: mainEl,
    isCompleted: false,
    subtext: [],
  }

  if (mainEl === '') {
    // boş değer girilmeye çalışıyor ise hata veriyoruz
    mainInput.style.border = '1px solid gray'

    setTimeout(() => {
      mainInput.style.borderColor = 'transparent'
    }, 2000)
    return false
  }

  const todos = JSON.parse(localStorage.getItem('todos'))

  if (checkingExistValue(mainEl, todos)) {
    alert('It already exist')
    return false
  }

  todos.push(mainTodo)

  localStorage.setItem('todos', JSON.stringify(todos))
  // console.log(todos)

  allTodoContainer.insertAdjacentHTML('beforeend', createMainHtml(mainTodo))

  mainInput.value = ' '
  location.reload()
}

mainForm.addEventListener('submit', addTodo)

///// ADD TO DO SUB

const subForms = document.querySelectorAll('.sub_todo_form')
const subTodoInputs = document.querySelectorAll('.sub_todo_input')

const secondAddTodo = (e) => {
  e.preventDefault()
  let inputVal = e.target.children[0].children[0].value
  let inputEl = e.target.children[0].children[0]

  const subTodo = {
    text: inputVal,
    isCompleted2: false,
  }

  if (inputVal == '') {
    // boş değer girilmeye çalışıyor ise hata veriyoruz
    inputEl.style.border = '1px solid black'

    setTimeout(() => {
      inputEl.style.borderColor = 'transparent'
    }, 2000)
    return false
  }

  // Canceling Main Checkbox Checked
  const mainCb = e.target.parentNode.previousElementSibling.children[0]
  mainCb.checked = false

  const mainTodo = e.target.parentNode.parentNode.nextElementSibling
  // console.log(mainTodo)
  const mainTodoText =
    e.target.parentNode.parentNode.children[0].children[1].textContent

  // const mainEl =
  //   e.target.parentNode.parentNode.children[0].children[1].textContent

  /// Local storagedan maintodo yu seçip ona sub element ekleme

  const todos = JSON.parse(localStorage.getItem('todos'))

  const filteredTodos = todos.filter((todo) => todo.text === mainTodoText)

  let isCompletedStuation = filteredTodos[0].isCompleted

  if (isCompletedStuation) {
    filteredTodos.forEach((todo) => (todo.isCompleted = !isCompletedStuation))
  } else {
    filteredTodos.forEach((todo) => (todo.isCompleted = isCompletedStuation))
  }

  filteredTodos.forEach((todo) => todo.subtext.push(subTodo))

  localStorage.setItem('todos', JSON.stringify(todos))

  mainTodo.insertAdjacentHTML('beforeend', subHtml(subTodo))
  mainTodo.classList.remove('displaying')

  inputEl.value = ' '
  inputEl.placeholder = 'type here'
  // location.reload()
}

subForms.forEach((sub) => sub.addEventListener('submit', secondAddTodo))

/////// BUTTONS : EDIT, DELETE , SAVE

//  MAIN EDIT BUTTONS

const handlingMainEditBtns = (e) => {
  // Showing Save Button
  const targetingSaveBtn = e.target.previousElementSibling
  targetingSaveBtn.style.display = 'inline'

  // Hiding Edit and Delete Buttons
  const targetingDeleteBtn = e.target.nextElementSibling
  targetingDeleteBtn.style.display = ' none'
  e.target.style.display = 'none'

  const targetingMainTodo = e.target.closest('.main_todo_element')
  // The Element which are going to be hide

  const subAddInput = targetingMainTodo.children[1].children[0]
  subAddInput.style.display = 'none'
  console.log(subAddInput)

  const replaceSpanInput = targetingMainTodo.children[0]

  // New Input
  const targetingSpan = targetingMainTodo.children[0].children[1]
  console.log(targetingSpan)
  // targetingSpan.style.fontSize = '18px'
  const savingOldSpanText = targetingSpan.textContent
  console.log(savingOldSpanText)

  const todos = JSON.parse(localStorage.getItem('todos'))

  // Saving subs elements

  const selectingEl = todos.filter((todo) => todo.text === savingOldSpanText)
  const selectingSubs = selectingEl.subtext
  console.log(selectingSubs)

  // Getting All Items From Local Storage

  const newInput = document.createElement('input')

  newInput.value = savingOldSpanText
  newInput.style.padding = '2px'
  newInput.style.marginLeft = '50px'
  newInput.style.width = '120px'

  replaceSpanInput.append(newInput)
  newInput.focus()
  // targetingSpan.remove()
  // const restElements = todos.filter((todo) => todo.text !== savingOldSpanText)

  // localStorage.setItem('todos', JSON.stringify(restElements))
  // // console.log(savingOldSpanText)
}

const allMainEditBtns = document.querySelectorAll('.main_todo_edit')

allMainEditBtns.forEach((edBtns) =>
  edBtns.addEventListener('click', handlingMainEditBtns)
)

// MAIN SAVE BUTTON

const allSaveBtns = document.querySelectorAll('.main_todo_save')

const handlingMainSaveBtns = (e) => {
  const targetingMainTodo = e.target.closest('.main_todo_element')
  console.log(' targetingMainTodo ', targetingMainTodo)
  const targetingSpanValue =
    targetingMainTodo.children[0].children[1].textContent
  let targetingSpan = targetingMainTodo.children[0].children[1]
  console.log('targetingSpanValue ', targetingSpanValue)
  const targetingNewInputValue = targetingMainTodo.children[0].children[2].value
  console.log(targetingNewInputValue)
  const targetingNewInput = targetingMainTodo.children[0].children[2]
  console.log(targetingNewInput)

  console.log('targetingNewInputValue ', targetingNewInputValue)

  const todos = JSON.parse(localStorage.getItem('todos'))
  let filterTodos = todos.filter((todo) => todo.text === targetingSpanValue)
  if (checkingExistValue(targetingNewInputValue, todos)) {
    alert('It already exist')
    const showingEditButton = targetingMainTodo
    showingEditButton.querySelector('.main_todo_edit').style.display = 'inline'
    const showingDeleteButton = targetingMainTodo
    showingDeleteButton.querySelector('.main_todo_delete').style.display =
      'inline'
    const showingSubTodoInput = targetingMainTodo.children[1].children[0]
    showingSubTodoInput.style.display = 'inline'
    targetingSpan.textContent = targetingSpan.textContent
    // targetingSpan.style.fontSize = "2rem"
    e.target.style.display = 'none'
  }

  if (!checkingExistValue(targetingNewInputValue, todos)) {
    filterTodos[0].text = targetingNewInputValue
    const showingEditButton = targetingMainTodo
    showingEditButton.querySelector('.main_todo_edit').style.display = 'inline'
    const showingDeleteButton = targetingMainTodo
    showingDeleteButton.querySelector('.main_todo_delete').style.display =
      'inline'
    const showingSubTodoInput = targetingMainTodo.children[1].children[0]
    showingSubTodoInput.style.display = 'inline'

    e.target.style.display = 'none'
    targetingSpan.textContent = targetingNewInputValue
    // targetingSpan.style.fontSize = '2rem'
  }

  if (targetingNewInputValue === '') {
    // boş değer girilmeye çalışıyor ise hata veriyoruz
    targetingNewInput.style.border = '1px solid gray'
    targetingNewInput.placeholder = 'type something'
    setTimeout(() => {
      targetingNewInput.style.borderColor = 'transparent'
    }, 2000)
    return false
  }

  localStorage.setItem('todos', JSON.stringify(todos))

  // targetingSpan.textContent = targetingNewInputValue
  targetingNewInput.remove()
}

allSaveBtns.forEach((saveBtns) =>
  saveBtns.addEventListener('click', handlingMainSaveBtns)
)

// MAIN DELETE BUTTON

const allMainDeleteBtns = document.querySelectorAll('.main_todo_delete')
console.log(allMainDeleteBtns)

const handlingMainDeleteBtns = (e) => {
  const eachTodo = e.target.closest('.each_todo_element')
  const mainTodo = e.target.closest('.main_todo_element')
  const mainTodoText = mainTodo.querySelector('.main_todo_text').textContent

  let todos = JSON.parse(localStorage.getItem('todos'))
  todos = todos.filter((todo) => todo.text !== mainTodoText)
  localStorage.setItem('todos', JSON.stringify(todos))

  eachTodo.remove()
}

allMainDeleteBtns.forEach((dlt) =>
  dlt.addEventListener('click', handlingMainDeleteBtns)
)

// SUB DELETE BUTTON

const allSubDeleteBtns = document.querySelectorAll('.sub_todo_delete')
console.log(allSubDeleteBtns)

const handlingSubDeleteBtns = (e) => {
  const subTodoEl = e.currentTarget.closest('.sub_todo')
  // console.log(subTodoEl)
  const mainTodoVal = e.currentTarget
    .closest('.each_todo_element')
    .querySelector('.main_todo_text').textContent
  // console.log('mainTodoVal', mainTodoVal)
  const subTodoValue = subTodoEl.querySelector('.sub_todo_text').textContent
  // console.log('subTodoValue', subTodoValue)

  let todos = JSON.parse(localStorage.getItem('todos'))
  const mainEl = todos.filter((td) => td.text === mainTodoVal)
  console.log(mainEl)
  let subEls = mainEl[0].subtext
  console.log(subEls)
  subEls = subEls.filter((td) => td.text !== subTodoValue)
  console.log(subEls)

  mainEl[0].subtext = subEls
  console.log(mainEl)
  console.log(todos)

  localStorage.setItem('todos', JSON.stringify(todos))
  console.log(todos)

  // console.log(mainTodoFromLocalStorage)
  subTodoEl.remove()
}

allSubDeleteBtns.forEach((dlt) =>
  dlt.addEventListener('click', handlingSubDeleteBtns)
)

// CHECKBOXES

// MAıN CHECKBOXES
const allMainCheckBoxes = document.querySelectorAll('.main_todo_cb')
console.log(allMainCheckBoxes)

const handlingMainCheckboxes = (e) => {
  const mainTodoText = e.target.nextElementSibling.textContent
  const eachTodo = e.target.closest('.each_todo_element')
  const mainTodoCb = e.target
  console.log(mainTodoCb)
  const subCheckboxes = eachTodo.querySelectorAll('.sub_todo_cb')
  console.log(subCheckboxes)
  let todos = JSON.parse(localStorage.getItem('todos'))
  todos.forEach((td) => {
    if (td.text === mainTodoText) {
      ;(td.isCompleted = !td.isCompleted),
        td.subtext.forEach((std) => (std.isCompleted2 = !std.isCompleted2))
    }
  })
  if (mainTodoCb.checked) {
    subCheckboxes.forEach((sub) => (sub.checked = true))
  } else {
    subCheckboxes.forEach((sub) => (sub.checked = false))
  }

  localStorage.setItem('todos', JSON.stringify(todos))
}

allMainCheckBoxes.forEach((mainCb) =>
  mainCb.addEventListener('click', handlingMainCheckboxes)
)

//// DISPLAYIN OR HIDING SUB ELEMENTS

// console.log(mainTodoText)

// mainTodoText.forEach((main) => {
//   console.log(main.textContent)
// })
// const eachTodoElement = document.querySelectorAll('.each_todo_element')
const mainTodoText = document.querySelectorAll('.main_todo_text')

mainTodoText.forEach((main) => {
  main.addEventListener('click', function (e) {
    // const mainEl = e.target.parentNode.parentNode.children[0].children[1]
    // console.log(mainEl)
    const eachTodoContainer = e.target.closest('.each_todo_element')
    const subTodos = eachTodoContainer.children[1]

    let todos = JSON.parse(localStorage.getItem('todos'))
    // todos = todos.filter((td) => console.log(td.subtext))

    subTodos.classList.toggle('displaying')
  })
})

// SUB CHECKBOXES

const allSubTodoCbs = document.querySelectorAll('.sub_todo_cb')
console.log(allSubTodoCbs)

const handlingSubcheckBoxes = (e) => {
  const eachTodo = e.target.closest('.each_todo_element')
  const mainTodoText = eachTodo.querySelector('.main_todo_text')
  console.log(mainTodoText)
  const mainCb = eachTodo.querySelector('.main_todo_cb')
  const subTodoContainer = e.target.closest('.sub_todo_container')
  let todos = JSON.parse(localStorage.getItem('todos'))
  // todos = todos.filter(td => td.text ===)

  const allSubCbs = subTodoContainer.querySelectorAll('.sub_todo_cb')

  const allCbs = []
  const checkingSubCbs1 = allSubCbs.forEach((sub) =>
    allCbs.push(sub.checked === true)
  )
  const allTrues = (allCbs) => allCbs === true
  const checkingSubCbs2 = allCbs.every(allTrues)

  if (checkingSubCbs2) {
    mainCb.checked = true
  } else {
    mainCb.checked = false
  }
}

allSubTodoCbs.forEach((sub) =>
  sub.addEventListener('click', handlingSubcheckBoxes)
)

*/
