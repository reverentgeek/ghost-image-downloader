## Ghost Image Downloader

This utility can download all of the content images from an existing [Ghost](https://ghost.org/) site. This utility is useful for creating a backup, or for transferring the hosting of a Ghost site from one hosting service to another.

### Requirements

* Node.js 8.x or higher

### Instructions

1. **Creating a backup**? Clone or download this repository to your computer. <br />**Moving hosts** and have access to the server? Clone or download this repository to the server where you are hosting your new instance of Ghost.
1. Change to the folder where you have downloaded this repository's files.
1. Use `npm install` to install dependencies
1. [Export your Ghost content](https://help.ghost.org/article/13-import-export) and copy it to this repository's folder as `ghost.json`
1. Copy `config.sample.json` to `config.json` and change the settings to match your blog URL and ghost environment.
1. Run the utility using `node .`
