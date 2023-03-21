# UBConsole

An unblocked console that has almost the same functions as your average chrome browser one.

# Features

Console - Views all console messages (console.log, console.err, etc) messages

Dom Tree (elements) - Views the DOM tree

Network - Logs fetch requests

# In Progresss
- Sources
- Making DOM tree edit elements when content is changed

# Bugs
- Link in console to source of message may not work
- Unusual characters appearing in the console message source
- Styles may seen messed up on different sites


# Instalation

- Bookmark Injection
  - Create a bookmark injection
  - Set the script src to:
  - https://ghwosty.github.io/UBConsole/UBConsole.min.js (minified)
  - or
  - https://ghwosty.github.io/UBConsole/UBConsole.js (regular)
  
  Example:
  
  ```javascript: const script = document.createElement("script"); script.src = "https://ghwosty.github.io/UBConsole/UBConsole.min.js";   document.body.appendChild(script); void 0;```
