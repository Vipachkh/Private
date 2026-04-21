import os
from database import engine, Base, SessionLocal
from models import ProductModel, OrderModel, OrderItemModel
import repositories

def init_db():
    print("Creating tables in Supabase...")
    try:
        # Create tables based on models
        Base.metadata.create_all(bind=engine)
        print("Tables created successfully!")
    except Exception as e:
        print(f"Error creating tables: {e}")
        print("Please check your DATABASE_URL in .env file.")
        return

    # Seed mock data
    db = SessionLocal()
    
    # Check if products already exist
    existing_products = db.query(ProductModel).count()
    if existing_products == 0:
        print("Seeding initial products...")
        mock_products = repositories.products_db
        for p in mock_products:
            db_product = ProductModel(**p)
            db.add(db_product)
        
        try:
            db.commit()
            print("Products seeded successfully!")
        except Exception as e:
            db.rollback()
            print(f"Failed to seed products: {e}")
    else:
        print(f"Database already contains {existing_products} products. Skipping seed.")
        
    db.close()

if __name__ == "__main__":
    init_db()
