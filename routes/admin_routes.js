import { Router } from "express";
import { authTokenCheck, checkUser } from "../middlewares/auth_middleware.js";
import admin_user_controller from "../controller/admin_user_controller.js";
import admin_event_controller from "../controller/admin_event_controller.js";
import admin_organization_controller from "../controller/admin_org_controller.js";
import dashboard_controller from "../controller/dashboard_controller.js";

const router = Router();

// *Routes for actions to User
router.post(
  "/u/block",
  authTokenCheck,
  admin_user_controller.changeUserBlockState
);

router.get("/dashboard", dashboard_controller.dashboard_details);

// list all events
router.get("/e", authTokenCheck, admin_event_controller.fetchAllEvents);

// delete event
router.post("/e/remove", authTokenCheck, admin_event_controller.removeEvent);

router.post(
  "/e/verify",
  checkUser,
  admin_event_controller.changeEventVerificationState
);

// *Routes for actions to Organization
router.post(
  "/o/block",
  authTokenCheck,
  admin_organization_controller.changeOrgBlockState
);

router.post(
  "/o/verify",
  checkUser,
  admin_organization_controller.changeOrgVerificationState
);

export default router;
