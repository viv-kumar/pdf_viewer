PDF Viewer Application
This is a React-based web application that allows users to search, view, and bookmark PDF documents. It also offers features like page navigation, zoom control, and bookmark management.
Features
Search PDFs: Users can search study resources by name.
PDF Viewer: View PDF files in-browser with page-by-page navigation.
Zoom Controls: Ability to zoom in and out within the PDF viewer.
Bookmarks: Users can bookmark pages for easy access later.
Page Navigation: Quickly jump between pages with smooth scrolling.
Responsive Design: Works across desktop and mobile devices.
Project Structure
App.js: The main entry point of the application. It fetches the list of PDFs from an API and renders routes to the main page and the PDF viewer.
MainPage.js: Displays a list of available PDFs and provides search functionality.
Viewer.js: The core PDF viewer that includes features like page navigation, zoom controls, and bookmarking.
ViewPdf.js: Component responsible for rendering the viewer for a specific PDF.
Card.js: Displays PDF information in a card format on the main page.
Component/: Directory containing shared components like Viewer and Card.
Example Component Overview:
App.js

Fetches data from an external API (https://pfd-uploader.onrender.com/pdfs).
Renders the routes for the application.
MainPage.js

Displays a list of PDFs.
Allows searching through the PDFs and handles loading states.
Viewer.js

Handles the core PDF viewing functionality.
Users can navigate between pages, zoom in/out, and add bookmarks.
ViewPdf.js

Manages the state passed through the router and renders the selected PDF in the viewer.
Usage
Running the App
Home Page: Upon loading the application, the home page will display a list of available PDFs.

You can search for a specific PDF using the search bar at the top.
Clicking on a PDF will take you to a detailed view.
PDF Viewer:

Once you click on a PDF, the Viewer component will render the document.
You can navigate through pages using the arrows or scroll through the PDF.
You can also zoom in and out using the magnifier icons.
Add bookmarks by clicking the "Add Bookmark" button.
Bookmarks:

Access saved bookmarks through the top-right dropdown.
Click on a bookmark to navigate directly to the corresponding page.
