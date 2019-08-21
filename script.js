var tasks = [
	'Wyjść z psem',
	'Nauczyć się JS',
	'Popływać',
	'Zacząć używać sticky notes'
];

// Variables

var newTaskForm = document.querySelector('.new-task-container form');
var tasksContainer = document.querySelector('.tasks-container ul');

// On DOM load

document.addEventListener('DOMContentLoaded', function() {
	bindAddTaskEvents();
	showTasks();
});

// Add new task

function addNewTask(title) {
	var taskLi = document.createElement('li');
	
	taskLi.classList.add('single-task');
	taskLi.innerHTML = prepareTaskHTML(title);
	
	// Events - toggle and delete
	var toggleCompleteBtn = taskLi.querySelector('.toggle-complete-btn');
	var deleteBtn = taskLi.querySelector('.delete-task-btn');
	
	toggleCompleteBtn.addEventListener('click', function() {
		toggleTaskComplete(this);
	});
	
	deleteBtn.addEventListener('click', function() {
		deleteTask(this);
	});
	
	// Add task to DOM
	tasksContainer.appendChild(taskLi);
}

// Prepare HTML before adding new task

function prepareTaskHTML(title) {
	return '<div class="input-group">' +
			'<span class="input-group-btn">' +
				'<button class="btn btn-default toggle-complete-btn"><i class="fa fa-check"></i></button>' +
					'</span>' +

		'<input type="text" class="form-control" placeholder="Tytuł zadania..." value="' + title + '">' +

			'<span class="input-group-btn">' +
				'<button class="btn btn-danger delete-task-btn"><i class="fa fa-times"></i></button>' +
					'</span>' +
		'</div>';
}

// Handle new task form events

function bindAddTaskEvents() {
	
	// On submit
	newTaskForm.addEventListener('submit', function(event) {
		event.preventDefault();
		
		var title = this.querySelector('input').value;
		
		if (title) {
			addNewTask(title);
		}
		
	});
}


// Show tasks
function showTasks() {
	tasks.forEach(function(title) {
		addNewTask(title);
	});
}

// Toggle complete
function toggleTaskComplete(toggleBtn) {
	toggleBtn.classList.toggle('btn-success');
}

// Delete task
function deleteTask(deleteBtn) {
	var liToDelete = deleteBtn.closest('li');
	deleteBtn.closest('ul').removeChild(liToDelete);
}


//sticky notes



(function () {
  'use strict';
  
  var draggedEl,
      onDragStart,
      onDrag,
      onDragEnd,
      grabPointY,
      grabPointX,
      createNote,
      addNoteBtnEl;
  
  onDragStart = function (ev) {
    var boundingClientRect;
    if (ev.target.className.indexOf('bar') === -1) {
      return;
    }
    
    draggedEl = this;
    
    boundingClientRect = draggedEl.getBoundingClientRect();
    
    grabPointY = boundingClientRect.top - ev.clientY;
    grabPointX = boundingClientRect.left - ev.clientX;
  };
  
  onDrag = function (ev) {
    if (!draggedEl) {
      return;
    }
    
    var posX = ev.clientX + grabPointX,
        posY = ev.clientY + grabPointY;
    
    if (posX < 0) {
      posX = 0;
    }
    
    if (posY < 0) {
      posY = 0;
    }
    
    draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
  };
  
  onDragEnd = function () { 
    draggedEl = null;
    grabPointX = null;
    grabPointY = null;
  };
  
  createNote = function () {
    var stickerEl = document.createElement('div'),
        barEl = document.createElement('div'),
        textareaEl = document.createElement('textarea');
    
    var transformCSSValue = "translateX(" + Math.random() * 400 + "px) translateY(" + Math.random() * 400 + "px)";
    
    stickerEl.style.transform = transformCSSValue; 
    
    barEl.classList.add('bar');
    stickerEl.classList.add('sticker');
    
    stickerEl.appendChild(barEl);
    stickerEl.appendChild(textareaEl); 
    
    stickerEl.addEventListener('mousedown', onDragStart, false);
    
    document.body.appendChild(stickerEl);
  };
 
  
addNoteBtnEl = document.querySelector('.addNoteBtn');
  addNoteBtnEl.addEventListener('click', createNote, false);
  document.addEventListener('mousemove', onDrag, false);
  document.addEventListener('mouseup', onDragEnd, false);
})();