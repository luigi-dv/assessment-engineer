from typing import Optional
from uuid import UUID, uuid4
from pydantic import BaseModel, Field


class Poll(BaseModel):
    """
    Poll entity
    """

    id: Optional[UUID] = Field(default_factory=uuid4, alias="_id")
    question: str
    created_by: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            UUID: lambda u: str(u)  # Ensure UUIDs are serialized to string for JSON
        }
