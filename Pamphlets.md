# QoL Facilities > Pamphlets
> An arguably over-engineered way of presenting lengthy forms

*I would've named this component **the bible** but my codebase should be as agnostic as possible. :D*

Pamphlets was born out of my personal annoyance of creating forms that are not only lengthy but pollutes it's containing component.

It uses a component named **wizard-pamphlet** that takes a pamphlet definition from a centralized plugin named **pamphlet-ctrl**


A **Pamphlet Wizard** is nothing but an overglorified **v-window** component with additional navigation controls. It dynamically builds slots that matches its pamphlet definition defined within **pamphlet-ctrl**.


I wrote pamphlets in many ways and forms, after spending some time using it, a writing convention has emerged and I'd like to force those who would use pamphlets in their applications to follow this convention. It's too lengthy to be written here so I'll probably just explain it in person.