# Задание

Исправить код таким образом, чтобы при фокусе у инпутов добавлялась красная рамка. Обработка событий должна происходить на formElement.

### HTML

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
<form id="formElement">
    One: <input type="text"><br>
    Two: <input type="text">
</form>
</body>
</html>
```

### CSS

```
.focused {
    outline: solid 2px red;
}
```

### JS

```
var formElement = document.forms['formElement'];

formElement.onfocus = function(evt) {
    var activeElement = formElement.querySelector('.focused');
	if (activeElement) {
	    activeElement.classList.remove('focused');
    }
    evt.target.classList.add('focused');
};

formElement.onblur = function(evt) {
	var activeElement = formElement.querySelector('.focused');
    if (activeElement) {
     	activeElement.classList.remove('focused');
    }
};
```

## Решение

Проблема в том, что события **_onfocus_** и **_onblur_** не всплывают. Их можно регистрировать непосредственно на **_input_** элементе.

### Вариант 1

Повесить на **_formElement_** обработчик события **_focusin_** и **_focusout_** - этот способ подразумевает минимальное изменение исходного кода, а навешивание обработчиков событий на родителя с регистрацией события на **_event.target_** считается хорошей практикой.

### Вариант 2

Получить **_NodeList_** со всеми **_input_** элементами с помощью **_querySelectorAll()_**. **_NodeList_** имеет метод **_forEach()_**, с помощью которого на каждый **_input_** элемент можно повесить **_onfocus_** и **_onblur_**.

## Комментарий

var на const не менял, чтобы сохранить стилистику исходного кода.
