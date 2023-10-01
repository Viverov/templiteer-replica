import { DataSource } from 'typeorm';

export const cleanDB = async (datasource: DataSource): Promise<void> => {
    if (process.env.DATABASE_URL !== 'postgresql://testus:testpass@templiteer-dbtest:5432/testdb') {
        throw new Error(`Can't clean non-test db`);
    }

    const tables: any[] = await datasource.query(`SELECT table_name
                                           FROM information_schema.tables
                                           WHERE table_schema = 'public'
                                             AND table_type = 'BASE TABLE'
                                             AND table_name != 'migrations'`);
    if (tables.length > 0) {
        await datasource.query(`TRUNCATE ${tables.map((table) => table.table_name).join(',')} CASCADE`);
    }
};
