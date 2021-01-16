CREATE DATABASE FreshFitFuel;
GO

USE FreshFitFuel;
GO

CREATE TABLE MenuItems (
    Id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] nvarchar(255) NOT NULL,
    Description nvarchar(max) NOT NULL,
    Carbs int NULL,
    Protein int NULL,
    Fat int NULL,
    Calories int NULL,
    ImageUrl nvarchar(max) NULL,
    Category nvarchar(255) NOT NULL,
    Price DECIMAL(15,2)
);
