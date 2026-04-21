import pg8000.native

# Supabase database connection details
HOST = "db.cfituupmvfjszwpvljja.supabase.co"
PORT = 5432
DATABASE = "postgres"
USER = "postgres"
PASSWORD = "astra@T01ar2"

try:
    print(f"Attempting to connect to {HOST}...")
    con = pg8000.native.Connection(
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT,
        database=DATABASE
    )
    print("Connection successful!")
    
    # Run a simple query
    result = con.run("SELECT version();")
    print(f"PostgreSQL version: {result[0][0]}")
    
    con.close()
except Exception as e:
    print(f"Connection failed: {e}")

