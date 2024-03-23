export const petsSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "id": "/pets",
    "title": "Pet",
    "description": "A pet",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "The name of the pet"
        },
        "category": {
            "type": "string",
            "description": "The category of the pet"
        },
        "age": {
            "type": "number",
            "description": "The age of the pet"
        },
        "breed": {
            "type": "string",
            "description": "The breed of the pet"
        },
        "location": {
            "type": "string",
            "description": "The location of the pet"
        },
        "image": {
            "type": "string",
            "description": "The image of the pet"
        },
        "description": {
            "type": "string",
            "description": "The description of the pet"
        }
    },
    "required": ["name", "category", "age", "breed", "location", "image", "description"]
}