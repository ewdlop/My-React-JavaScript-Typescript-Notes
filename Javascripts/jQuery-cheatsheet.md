# jQuery Cheatsheet

## Selectors
### Basic Selectors
```javascript
$('element')        // Element selector
$('#id')           // ID selector
$('.class')        // Class selector
$('[attr="value"]') // Attribute selector
$('el1, el2')      // Multiple selectors
$('el1 el2')       // Descendant selector
$('el1 > el2')     // Child selector
```

### Special Selectors
```javascript
$(':first')        // First element
$(':last')         // Last element
$(':even')         // Even elements
$(':odd')          // Odd elements
$(':eq(n)')        // Element at index n
$(':gt(n)')        // Elements after index n
$(':lt(n)')        // Elements before index n
$(':contains(text)') // Elements containing text
$(':empty')        // Elements with no children
$(':visible')      // Visible elements
$(':hidden')       // Hidden elements
```

## DOM Manipulation
### Getting/Setting Content
```javascript
.html()            // Get HTML content
.html('new')       // Set HTML content
.text()            // Get text content
.text('new')       // Set text content
.val()             // Get input value
.val('new')        // Set input value
.attr('attr')      // Get attribute
.attr('attr', 'val') // Set attribute
.removeAttr('attr') // Remove attribute
```

### Modifying Elements
```javascript
.addClass('class')    // Add class
.removeClass('class') // Remove class
.toggleClass('class') // Toggle class
.css('property')      // Get CSS property
.css('prop', 'val')   // Set CSS property
.css({prop: 'val'})   // Set multiple CSS properties
```

### DOM Insertion
```javascript
.append(content)      // Add content at end
.prepend(content)     // Add content at beginning
.after(content)       // Add content after
.before(content)      // Add content before
.remove()             // Remove element
.empty()              // Remove all child elements
.clone()              // Clone element
```

## Events
### Event Binding
```javascript
.click(handler)       // Click event
.dblclick(handler)    // Double click event
.hover(handlerIn, handlerOut) // Hover event
.focus(handler)       // Focus event
.blur(handler)        // Blur event
.on('event', handler) // Bind event
.off('event')         // Unbind event
.one('event', handler) // One-time event binding
```

### Event Object
```javascript
event.preventDefault()  // Prevent default action
event.stopPropagation() // Stop event bubbling
event.target           // Event target element
event.currentTarget    // Current event element
event.type            // Event type
event.which           // Key/button pressed
```

## AJAX
### Basic AJAX
```javascript
$.ajax({
  url: 'url',
  method: 'GET',
  data: {key: 'value'},
  success: function(response) {},
  error: function(xhr, status, error) {}
});

// Shorthand methods
$.get('url', data, success)
$.post('url', data, success)
$.getJSON('url', data, success)
```

### AJAX Settings
```javascript
$.ajaxSetup({
  url: 'url',
  contentType: 'application/json',
  dataType: 'json',
  headers: {},
  timeout: 3000,
  cache: false
});
```

## Effects & Animations
### Basic Effects
```javascript
.show()              // Show element
.hide()              // Hide element
.toggle()            // Toggle visibility
.fadeIn()            // Fade in
.fadeOut()           // Fade out
.fadeToggle()        // Toggle fade
.slideUp()           // Slide up
.slideDown()         // Slide down
.slideToggle()       // Toggle slide
```

### Custom Animations
```javascript
.animate({
  properties: values
}, duration, easing, complete)
```

## Utilities
### Array & Object Operations
```javascript
$.each(array, callback)    // Iterate array/object
$.map(array, callback)     // Map array/object
$.grep(array, callback)    // Filter array
$.extend(target, source)   // Extend object
$.merge(array1, array2)    // Merge arrays
```

### Type Checking
```javascript
$.isArray(obj)       // Check if array
$.isFunction(obj)    // Check if function
$.isNumeric(obj)     // Check if numeric
$.type(obj)          // Get type
```

### URL & String Operations
```javascript
$.param(obj)         // Serialize object to URL string
$.trim(str)          // Remove whitespace
```

## Traversing
### Tree Traversal
```javascript
.find('selector')    // Find descendants
.children('selector') // Find immediate children
.parent('selector')  // Find parent
.parents('selector') // Find all parents
.siblings('selector') // Find siblings
.next('selector')    // Next element
.prev('selector')    // Previous element
.closest('selector') // Closest parent matching selector
```

### Filtering
```javascript
.first()             // First element
.last()              // Last element
.eq(index)           // Element at index
.filter('selector')  // Filter elements
.not('selector')     // Remove elements
```

## Dimensions
### Getting & Setting Dimensions
```javascript
.width()             // Get/set width
.height()            // Get/set height
.innerWidth()        // Include padding
.innerHeight()       // Include padding
.outerWidth()        // Include padding & border
.outerHeight()       // Include padding & border
.outerWidth(true)    // Include margin
.outerHeight(true)   // Include margin
```

## Best Practices
1. Always use `$(document).ready()` or `$(function(){})` for DOM-ready code
2. Cache jQuery selectors for better performance
3. Use event delegation for dynamic elements
4. Chain methods when possible
5. Use meaningful selectors
6. Handle AJAX errors appropriately
7. Clean up event bindings when removing elements
