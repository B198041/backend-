import User from "../models/user.js";
import Event from "../models/events.js";
import Organization from "../models/organization.js";

const actions = {};

actions.dashboard_details = async (_, res) => {
  const now = new Date();
  try {
    const [
      totalUsers,
      verifiedUsers,
      blockedUsers,
      unverifiedUsers,
      totalEvents,
      upcomingEvents,
      pastEvents,
      totalOrganizations,
      verifiedOrganizations,
      blockedOrganizations,
      pendingOrganizations,
    ] = await Promise.all([
      // Users
      User.countDocuments(),
      User.countDocuments({
        hasVerifiedEmail: true,
        "blockStatus.isBlocked": false,
      }),
      User.countDocuments({ "blockStatus.isBlocked": true }),
      User.countDocuments({
        hasVerifiedEmail: false,
        "blockStatus.isBlocked": false,
      }),

      // Events
      Event.countDocuments(),
      Event.countDocuments({
        "dateTime.dates": { $not: { $elemMatch: { $gte: new Date() } } },
      }),
      Event.countDocuments({
        "dateTime.dates": { $elemMatch: { $gte: new Date() } },
      }),

      Organization.countDocuments({}),
      Organization.countDocuments({
        "verificationState.isVerified": true,
        "blockStatus.isBlocked": false,
      }),
      Organization.countDocuments({
        "blockStatus.isBlocked": true,
      }),
      //   Organization.countDocuments({
      //     "verificationState.isVerified": false,
      //     "blockStatus.isBlocked": false,
      //   }),
    ]);

    return res.json({
      users: {
        total: totalUsers,
        verified: verifiedUsers,
        blocked: blockedUsers,
        unverified: unverifiedUsers,
      },
      events: {
        total: totalEvents,
        upcoming: upcomingEvents,
        past: pastEvents,
      },
      organizations: {
        total: totalOrganizations,
        verified: verifiedOrganizations,
        blocked: blockedOrganizations,
        // pending: pendingOrganizations,
      },
      state: true,
    });
  } catch (error) {
    return res.json({ message: error.message, state: false });
  }
};

export default actions;
