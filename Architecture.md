
# Usecase to handle
Furniture has 2 types of attributes.
1) Fixed - Attributes like colour,dimension,material,purchase price etc.
2) Derived - Attributes like Assembling cost,time to assemble etc.<br/>

## Usecase: Get latest values of derived attributes?
**Proposal:**
<br/>To handle the derived attributes, I propose 2 microservices.<br/>
1)CasaOne Furniture Domain Microservice - Exposes REST APIs that gives furniture details<br/>
2)CasaOne Furniture Operations Microservice - Exposes REST APIs to get derived attributes from Operations team<br/>
The communication between these microservices will be through Apache Kafka which supports a Pub-Sub model.
<br/>Let's take an example:<br/>
Consider the attribute **cost to Assemble**.<br/>
As a part of Devops, topics will be created in Apache Kafka.Suppose one of the topic name is **cost to Assemble**.<br/>
**CasaOne Furniture Operations Microservice** will publish data against **cost to Assemble** when there is an update operation on it.<br/>
This update operation will be triggered by a Persona who belongs to Furniture Operations team will use an UI to update this value.<br/>
**CasaOne Furniture Domain Microservice** has already subscribed to the topic **cost to Assemble** and therefore whenever there is a published data, it will get it and update it in the DB.

**Benefits:**
1) Decoupling
2) Scalable
