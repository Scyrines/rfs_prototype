from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker
from fastapi.middleware.cors import CORSMiddleware

# 1. Database Setup (Using SQLite for the quick prototype)
SQLALCHEMY_DATABASE_URL = "sqlite:///./rfs_test.db" 
# To use Postgres later, change to: "postgresql://user:password@localhost/dbname"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 2. Database Model
class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(Integer, primary_key=True, index=True)
    cost_centre = Column(String, index=True)
    rfs_type = Column(String)
    job_scope = Column(String)

Base.metadata.create_all(bind=engine)

# 3. FastAPI App Setup
app = FastAPI()

# Allow React to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Pydantic Schema (for validation)
class TicketCreate(BaseModel):
    cost_centre: str
    rfs_type: str
    job_scope: str

# 5. API Endpoints
@app.post("/api/tickets/")
def create_ticket(ticket: TicketCreate):
    db = SessionLocal()
    db_ticket = Ticket(cost_centre=ticket.cost_centre, rfs_type=ticket.rfs_type, job_scope=ticket.job_scope)
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    db.close()
    return {"message": "Ticket created successfully!", "ticket_id": db_ticket.id}

@app.get("/api/tickets/")
def get_tickets():
    db = SessionLocal()
    tickets = db.query(Ticket).all()
    db.close()
    return tickets