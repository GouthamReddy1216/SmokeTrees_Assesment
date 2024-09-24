# User Address Management System

This project is a simple backend application where users can register and store their addresses. The application maintains two relational database tables: `User` and `Address`, with a **one-to-many relationship** between users and their addresses. This system allows users to submit their name and address through a form, storing the user's name in the `User` table and their corresponding address in the `Address` table.

## Features

- **User Registration**: Users can submit their name and address via a form.
- **Database Storage**: 
  - The user's name is stored in the `User` table.
  - The address is stored in the `Address` table.
- **One-to-Many Relationship**: Each user can have multiple addresses.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js (Express)
- **Database**: MySQL

## Live Demo

Check out the live version of the project [here](https://smoketrees-assesment.onrender.com).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GouthamReddy1216/SmokeTrees_Assesment.git
   ```
