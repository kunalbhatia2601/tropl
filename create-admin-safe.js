const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdminIfNotExists() {
  try {
    console.log('🔍 Checking if admin user exists...');
    
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@tropl.ai' }
    });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists: admin@tropl.ai');
      return;
    }
    
    console.log('🌱 Creating admin user...');
    
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Create admin user with recruiter role
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@tropl.ai',
        name: 'Admin User',
        role: 'RECRUITER',
        verified: true,
        password: hashedPassword,
      },
    });
    
    // Create recruiter profile
    const recruiter = await prisma.recruiter.create({
      data: {
        userId: adminUser.id,
        companyName: 'Tropl',
        department: 'Administration',
        designation: 'System Administrator',
        experience: 10,
      },
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@tropl.ai');
    console.log('🔑 Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminIfNotExists();
