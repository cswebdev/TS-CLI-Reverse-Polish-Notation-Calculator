```
                                       _ _     _                     
 ___ ___ _ _ ___ ___ ___ ___   ___ ___| |_|___| |_                   
|  _| -_|  || -_|  _|_ -| -_| | . | . | | |_ -|   |                  
|_| |___|_/ |___|_| |___|___| |  _|___|_|_|___|_|_|                  
                              |_|                                    
                            
         _       _   _                    _         _     _           
 ___ ___| |_ ___| |_|_|___ ___    ___ ___| |___ _ _| |___| |_ ___ ___ 
|   | . |  _| .'|  _| | . |   |  |  _| .'| |  _| | | | .'|  _| . |  _|
|_|_|___|_| |__,|_| |_|___|_|_|  |___|__,|_|___|___|_|__,|_| |___|_|


Version 1.0
By Chelsea Snider
```

<h1>Reverse Polish Notation (RPN) Calculator</h1>

<p>Welcome to the RPN Calculator, a command-line utility designed for those who are comfortable with UNIX-like CLI environments. This calculator provides a simple and efficient way to perform mathematical operations using Reverse Polish Notation (RPN).</p>

<h2>High-Level Description</h2>

<p>The RPN Calculator allows users to input mathematical expressions in Reverse Polish Notation format and receive the computed result. This initial version supports the basic four operators: addition, subtraction, multiplication, and division. The application is built with scalability in mind, preparing for future enhancements such as additional operators and alternate interfaces like WebSocket, file, or TCP socket.</p>

<h2>Technical Choices and Reasoning</h2>

<h3>Architectural Decisions</h3>

<ul>
  <li><strong>Command-Line Interface:</strong> I chose a CLI utility as our initial interface to cater to users familiar with UNIX-like environments, providing a straightforward and efficient user experience.</li>
  <li><strong>Node.js:</strong> The application is built using Node.js due to its asynchronous nature, ease of handling I/O operations, and wide adoption in the development community.</li>
  <li><strong>Readline Module:</strong> I utilized Node.js's <code>readline</code> module to handle user input efficiently, making the application interactive and responsive.</li>
</ul>

<h3>Trade-offs and Future Enhancements</h3>

<ul>
  <li><strong>Basic Operators:</strong> In this version, I have limited the calculator to the basic four operators. This decision was made to ensure a stable and functional initial release. Future updates will include more complex operators and functions.</li>
  <li><strong>Single Interface:</strong> Currently, the application only supports CLI. However, I have designed the code with future scalability in mind, allowing for the addition of WebSocket, file, or TCP socket interfaces.</li>
  <li><strong>Error Handling:</strong> While basic error handling is implemented, more comprehensive validation and user feedback mechanisms will be introduced in future updates.</li>
</ul>

<h2>How to Run the Code</h2>

<h3>Prerequisites</h3>

<ul>
  <li>Node.js (v14 or later)</li>
  <li>npm (Node Package Manager)</li>
</ul>

<h3>Setup Instructions</h3>

<ol>
  <li><strong>Clone the Repository</strong>
    <pre><code>git clone git@github.com:cswebdev/TS-CLI-Reverse-Polish-Notation-Calculator.git
    </code></pre>
  </li>
  <li><strong>Install Dependencies</strong>
    <pre><code>npm install
    </code></pre>
  </li>
  <li><strong>Run the Application</strong>
    <pre><code>npx ts-node src/index.ts
    </code></pre>
  </li>
  <li><strong>Test the Application</strong>
    <pre><code>npx jest
    </code></pre>
  </li>
</ol>

<h3>Usage</h3>

<p>Upon running the application, you will be greeted with a welcome message and instructions for using the calculator. Enter mathematical expressions in Reverse Polish Notation to receive the computed result. Use the following commands for additional functionality:</p>

<ul>
  <li><code>start</code>: Initialize the calculator.</li>
  <li><code>help</code>: Display the help menu.</li>
  <li><code>clear</code>: Clear the console.</li>
  <li><code>quit</code>: Exit the application.</li>
</ul>

<h2>Future Enhancements</h2>

<p>I plan to introduce the following features in future updates:</p>

<ul>
  <li><strong>Additional Operators:</strong> Support for more complex mathematical functions.</li>
  <li><strong>Alternate Interfaces:</strong> Implementations for WebSocket, file-based input/output, and TCP socket communication.</li>
  <li><strong>Enhanced Error Handling:</strong> More robust validation and error messaging to improve user experience.</li>
</ul>

<p>Stay tuned for updates and new features!</p>

<hr>

<p>Thank you for using the RPN Calculator. If you encounter any issues or have suggestions for improvement, please feel free to contribute to the repository or open an issue.</p>

<h3>Link to Hosted Application</h3>

<p>(Currently not applicable as this is a CLI utility. Future versions may include Web-based interfaces.)</p>

<hr>

<p><strong>Repository:</strong> <a href="https://github.com/cswebdev/TS-CLI-Reverse-Polish-Notation-Calculator/">https://github.com/cswebdev/TS-CLI-Reverse-Polish-Notation-Calculator</a></p>

<p><strong>Author:</strong> Chelsea Snider</p>

<p><strong>Version:</strong> 1.0</p>

<p>Feel free to reach out with any questions or feedback. Happy calculating!</p>
