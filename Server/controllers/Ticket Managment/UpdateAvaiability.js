const EmployeeModel = require("../../models/Employees");
const Notification = require("../../models/Notification");

const UpdateAvailability = async (req, res) => {
  try {
    const { availabilityStatus } = req.body;
    const { userId, role } = req.user;

    if (role !== "employee") {
      return res.status(403).json({
        message:
          "Unauthorized: Only employees can update their availability status",
      });
    }

    const employee = await EmployeeModel.findOne({ _id: userId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update availability status
    employee.avaibality = availabilityStatus;
    const updatedEmp = await employee.save();

    // Find all admins
    const adminList = await EmployeeModel.find({ role: "admin" });

    // Create a notification
    const notification = new Notification({
      message: `Employee with ID ${userId} has updated their availability status to ${availabilityStatus}`,
      role: "admin",
      userId: userId,
    });

    await notification.save();

    // Emit notification to each admin
    const io = req.io;
    adminList.forEach((admin) => {
      io.to(admin._id.toString()).emit("notification", notification);
    });

    console.log("Admin Side Notification", notification);

    res.status(200).json({
      message: "Availability status updated successfully",
      employee: updatedEmp,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating availability status",
      error: error.message,
    });
  }
};

module.exports = { UpdateAvailability };
