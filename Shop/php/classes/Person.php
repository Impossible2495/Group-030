<?php

class Person {
  private $name;
  private $lastname;
  private $age;
  private $hp;
  private $mother;
  private $father;

  function __construct($name, $lastname, $age, $mother, $father)
  {
    $this->name = $name;
    $this->lastname = $lastname;
    $this->age = $age;
    $this->mother = $mother;
    $this->father = $father;
    $this->hp = 100;
  }

  function sayHi($name) {
    return "Hi $name, I'm " . $this->name;
  }

  function setHp($hp) {
    if($this->hp + $hp > 100) $this->hp = 100;
    else $this->hp = $this->hp + $hp;
  }
  function getHp() {
    return $this->hp;
  }
  function getName() {
    return $this->name;
  }
  function getLastName() {
    return $this->lastname;
  }
  function getAge() {
    return $this->age;
  }
  function getMother() {
    return $this->mother;
  }
  function getFather() {
    return $this->father;
  }
  function getInfo() {
    return "
      <h2>Несколько слов о моих родственниках: </h2><br>" . "Меня зовут - " . $this->getName() . 
      "<br> Моя фамилия - " . $this->getLastName() . 
      "<br> Мне " . $this->getAge() . " лет" . 
      "<br> Мои родственники: " . 
      "<br>Мама - " . $this->getMother()->getName() . " " . $this->getMother()->getLastName() . " " . $this->getMother()->getAge() . " лет" . 
      "<br>Папа - " . $this->getFather()->getName() . " " . $this->getFather()->getLastName() . " " . $this->getFather()->getAge() . " лет" . 
      "<br>Бабушка по маминой линии - " . $this->getMother()->getMother()->getName() . " " . $this->getMother()->getMother()->getLastName() . " " . $this->getMother()->getMother()->getAge() . " лет" . 
      "<br>Дедушка по маминой линии - " . $this->getMother()->getFather()->getName() . " " . $this->getMother()->getFather()->getLastName() . " " . $this->getMother()->getFather()->getAge() . " лет" . 
      "<br>Бабушка по папиной линии - " . $this->getFather()->getMother()->getName() . " " . $this->getFather()->getMother()->getLastName() . " " . $this->getFather()->getMother()->getAge() . " лет" . 
      "<br>Дедушка по папиной линии - " . $this->getFather()->getFather()->getName() . " " . $this->getFather()->getFather()->getLastName() . " " . $this->getFather()->getFather()->getAge() . " лет";
  }
}

$igor = new Person("Igor", "Petrov", 68, null, null); // Дедушка по маминой линии
$elena = new Person("Elena", "Petrova", 60, null, null); // Бабушка по маминой линии

$dima = new Person("Dmitri", "Ivanov", 72, null, null); // Дедушка по папиной линии
$alena = new Person("Alena", "Ivanova", 69, null, null); // Бабушка по папиной линии


$alex = new Person("Alex", "Ivanov", 32, $alena, $dima); // Отец
$olga = new Person("Olga", "Ivanova", 30, $elena, $igor); // Мама
$andrey = new Person("Andrey", "Ivanov", 10, $olga, $alex); //Сын

echo $andrey->getInfo();




//Здоровье человека не может быть больше 100


// $alex->setHp(-30); //Упал

// $medKit = 50;

// echo $alex->getHp() . "<br>";

// $alex->setHp($medKit); //Нашел аптечку

// echo $alex->getHp();


// echo $alex->sayHi($igor->name);
// echo $alex->name;

// $alex = new Person();

// $alex->name = "Alex";