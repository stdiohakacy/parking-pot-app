### Getting Ready: Parking Lot
Let's make an object-oriented design for a multi-entrance and exit parking lot system.

### Problem definition
A parking lot is a designated area for parking vehicles and is a feature found in almost all popular venues such as shopping malls, sports stadiums, offices, etc. In a parking lot, there are a fixed number of parking spots available for different types of vehicles. Each of these spots is charged according to the time the vehicle has been parked in the parking lot. The parking time is tracked with a parking ticket issued to the vehicle at the entrance of the parking lot. Once the vehicle is ready to exit, it can either pay at the automated exit panel or to the parking agent at the exit using a card or cash payment method.

### Expectations from the interviewee
In a typical parking lot system, there are several components each with specific constraints and requirements. The following section provides an overview of some major expectations the interviewer will want an interviewee to discuss in more detail during the interview.

### Payment flexibility 
One of the most significant attributes of the parking lot system is the payment structure that it provides to its customers. An interviewer would expect you to ask questions like these:

How are customers able to pay at different exit points (i.e., either at the automated exit panel or to the parking agent) and by different methods (cash, credit, coupon)?

If there are multiple floors in the parking lot, how will the system keep track of the customer having already paid on a particular floor rather than at the exit?

### Parking spot type 
Another topic of discussion that an interviewer would expect you to be aware of is the different parking spot types—handicapped, compact, large, and motorcycle—regarding which you can ask the following questions:

How will the parking capacity of each lot be considered?

What happens when a lot becomes full?

How can one keep track of the free parking spots on each floor if there are multiple floors in the parking lot?

How will the division of the parking spots be carried out among the four different parking spot types in the lot?

### Vehicle types
Similar to the parking spot, an interviewer would also expect you to discuss the different vehicle types—car, truck, van, motorcycle—which can have the following set of questions:

How will capacity be allocated for different vehicle types?

If the parking spot of any vehicle type is booked, can a vehicle of another type park in the designated parking spot?

### Pricing
We touched upon the payment structure offered by the parking lot system. Now, the pricing model needs to be clarified from the interviewer, and therefore you may ask questions like these:

How will pricing be handled? Should we accommodate having different rates for each hour? For example, customers will have to pay $4 for the first hour, $3.5 for the second and third hours, and $2.5 for all the subsequent hours.

Will the pricing be the same for the different vehicle types?

### Design approach
We are going to design this parking lot system using the bottom-up design approach. For this purpose, we will follow the steps below:

Identify and design the smallest components first, like, the vehicle and parking spot types.

Use these small components to design bigger components, for example, the payment system at the exit.

Repeat the steps above until we design the whole system like the parking lot.

### Design pattern
It is always a good practice to discuss the design patterns that a parking lot system falls under, during the interview. Stating the design patterns will give the interviewer a positive impression and shows that the interviewee is well-versed in the advanced concepts of object-oriented design. The following design patterns can be used to design the parking lot system:

Singleton design pattern

Abstract Factory design pattern

Factory design pattern

====================================================================================

### Requirements for the Parking Lot Design

Requirements collection
Let’s define the requirements for the parking lot problem:

R1: The parking lot should have the capacity to park 40,000 vehicles.
R2: The four different types of parking spots are handicapped, compact, large, and motorcycle.
R3: The parking lot should have multiple entrance and exit points.
R4: Four types of vehicles should be allowed to park in the parking lot, which are as follows: Car, Truck, Van, Motorcycle
R5: The parking lot should have a display board that shows free parking spots for each parking spot type.
R6: The system should not allow more vehicles in the parking lot if the maximum capacity (40,000) is reached.
R7: If the parking lot is completely occupied, the system should show a message on the entrance and on the parking lot display board.
R8: Customers should be able to collect a parking ticket from the entrance and pay at the exit.
R9: The customer can pay for the ticket either with an automated exit panel or pay the parking agent at the exit.
R10: The payment should be calculated at an hourly rate.
R11: Payment can be made using either a credit/debit card or cash.

====================================================================================

### Use Case Diagram for the Parking Lot

### System
Our system is a "parking lot."

### Actors
Here are the main actors of our parking lot system.

### Primary actors #
Customer: This actor can park the vehicle in the allocated parking space according to the vehicle type and pay for the parking before exit.

Parking agent: The parking agent will assist the customer and perform all the tasks that a customer can do, such as paying the parking ticket on behalf of the customer.

### Secondary actors
Admin: This can add, remove, or update a spot, agent, entry/exit panels, and view/update accounts.

System: This is responsible for giving details of parking spot availability and assigning a parking spot to a vehicle.

### Use Cases
In this section, we will define the use cases for the parking lot. We have listed down the use cases according to their respective interactions with a particular actor.

### Admin
Add spot: To add a parking spot
Add agent: To add a new agent
Add/modify rate: To add/modify hourly rate
Add entry/exit panel: To add and update exit/entry panel at each entry/exit
Update account: To update account details and payment information
Login/Logout: To login/logout to/from agent or admin account
View account: To view account details like payment status or unpaid amount

### Customer
Take ticket: To take a ticket at the entrance, that contains information regarding the vehicle and its entrance time
Scan ticket: To scan the ticket at the exit and get the parking fee
Pay ticket: To pay the parking fee at the exit panel via cash or a credit card
Cash: To pay the parking fee via cash
Credit card: To pay the parking fee via credit card
Park vehicle: To park the vehicle at the assigned destination

### Parking agent
Update account: To update account details and payment information
Login/Logout: To log in/log out to/from the agent or admin account
View account: To view account details like payment status or unpaid amount
Take ticket: To take a ticket at the entrance, that contains information regarding the vehicle and its entrance time
Scan ticket: To scan the ticket at the exit and get the parking fee
Pay ticket: To pay the parking fee at the exit panel via cash or a credit card
Cash: To pay the parking fee via cash
Credit card: To pay the parking fee via credit card
Park vehicle: To park the vehicle at the assigned destination

### System
Assigning parking spots to vehicles: To check the vehicle type and associate a free spot according to it
Remove spot: To remove a parking spot if it is not available for parking
Show full: To display the status of the parking lot as full
Show available: To show the details of available parking spots

### Relationships
This section describes the relationships between and among actors and their use cases.

### Generalization
The “Parking agent” has a generalization relationship with the “Customer” since the parking agent can perform all those tasks that a customer can perform.

“Cash” and “Credit card” use cases are used for payments. Hence, both have a generalization relationship with the “Pay ticket” use case.

### Associations
The table below shows the association relationship between actors and their use cases.

====================================================================================

### Design pattern
The system itself will have a ParkingLot class. It will use the Singleton design pattern, because there will only be a single instance of the parking lot system.

This parking lot system is also composed of smaller objects that we have already designed, like entrance, exit, parking spots, parking rates, etc. Therefore, it will be a good practice to use the Abstract Factory and Factory design pattern to instantiate all those objects.

====================================================================================

### Additional requirements
The interviewer can introduce some additional requirements in the parking lot system, or they can ask some follow-up questions. Let’s see some examples of additional requirements:

Parking floor: The parking lot should have multiple floors where customers can park their cars. The class diagram provided below shows the relationship of ParkingFloor with other classes:

Electric: The parking lot should have some parking spots specified for electric cars. These spots should have an electric panel through which customers can pay and charge their vehicles. The class diagram provided below shows the relationship of Electric and ElectricPanel with other classes:

====================================================================================

### RESTful APIs
Display Board APIs:

GET /display-boards: Retrieve information about all display boards.
GET /display-boards/{id}: Retrieve information about a specific display board.
PUT /display-boards/{id}: Update the information of a display board.
Entrance APIs:

GET /entrances: Retrieve information about all entrances.
GET /entrances/{id}: Retrieve information about a specific entrance.
PUT /entrances/{id}: Update the information of an entrance.
Exit APIs:

GET /exits: Retrieve information about all exits.
GET /exits/{id}: Retrieve information about a specific exit.
PUT /exits/{id}: Update the information of an exit.
Parking Lot APIs:

GET /parking-lots: Retrieve information about all parking lots.
GET /parking-lots/{id}: Retrieve information about a specific parking lot.
PUT /parking-lots/{id}: Update the information of a parking lot.
Parking Rate APIs:

GET /parking-rates: Retrieve information about all parking rates.
GET /parking-rates/{id}: Retrieve information about a specific parking rate.
PUT /parking-rates/{id}: Update the information of a parking rate.
Parking Spot APIs:

GET /parking-spots: Retrieve information about all parking spots.
GET /parking-spots/{id}: Retrieve information about a specific parking spot.
PUT /parking-spots/{id}: Update the information of a parking spot.
Parking Ticket APIs:

GET /parking-tickets: Retrieve information about all parking tickets.
GET /parking-tickets/{id}: Retrieve information about a specific parking ticket.
POST /parking-tickets: Generate a new parking ticket.
PUT /parking-tickets/{id}: Update the information of a parking ticket.
Payment APIs:

GET /payments: Retrieve information about all payments.
GET /payments/{id}: Retrieve information about a specific payment.
POST /payments: Process a new payment.
User APIs:

GET /users: Retrieve information about all users.
GET /users/{id}: Retrieve information about a specific user.
POST /users: Create a new user.
PUT /users/{id}: Update the information of a user.
Vehicle APIs:

GET /vehicles: Retrieve information about all vehicles.
GET /vehicles/{id}: Retrieve information about a specific vehicle.
POST /vehicles: Add a new vehicle.
PUT /vehicles/{id}: Update the information of a vehicle.
Authentication APIs:

POST /auth/login: Authenticate a user and retrieve an access token.

====================================================================================
### Design Patterns

Several design patterns can be applicable in the context of the above requirements. Here are some design patterns that can be considered:

Singleton Pattern:
The Singleton pattern can be used to ensure that there is only one instance of critical components such as the parking lot system, display board, or payment system. It helps in managing shared resources and maintaining consistency across the system.

Factory Pattern:
The Factory pattern can be utilized to create instances of different parking spot types or payment methods based on the input or requirements. It provides a centralized approach for creating objects, promoting flexibility and modularity.

Strategy Pattern:
The Strategy pattern can be applied to handle various payment methods (credit card, cash) or parking rate calculation strategies. It allows encapsulating different algorithms and selecting them dynamically based on runtime conditions.

Observer Pattern:
The Observer pattern can be employed to notify the display board or other relevant components about changes in the parking spot availability or ticket status. It enables loose coupling and efficient communication between different parts of the system.

Command Pattern:
The Command pattern can be useful for implementing actions related to ticket generation, payment processing, or updating parking spot status. It encapsulates requests as objects, providing flexibility and extensibility in handling user actions.

Decorator Pattern:
The Decorator pattern can be used to add additional functionalities or behavior to parking spots, such as marking a parking spot as handicapped or assigning it a priority status. It allows for dynamic modification of object behavior at runtime.

State Pattern:
The State pattern can be utilized to manage the different states of a parking ticket (e.g., paid, unpaid, expired) or parking spot (e.g., occupied, available). It helps in organizing and encapsulating state-specific behavior and transitions.

Proxy Pattern:
The Proxy pattern can be applied to provide controlled access to sensitive or expensive operations, such as payment processing or vehicle entry/exit. It adds a layer of abstraction and enables additional functionality before or after the actual operation.

It's important to note that the choice of design patterns may vary based on the specific implementation and architectural considerations. The above patterns provide a starting point and can be adapted and combined as per the requirements and system design.