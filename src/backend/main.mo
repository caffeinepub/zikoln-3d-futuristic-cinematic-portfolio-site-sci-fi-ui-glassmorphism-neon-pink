import Array "mo:core/Array";
import Map "mo:core/Map";
import List "mo:core/List";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Bool "mo:core/Bool";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Option "mo:core/Option";
import VarArray "mo:core/VarArray";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Category = {
    #SocialMedia;
    #Posters;
    #Thumbnails;
    #Logos;
    #Print;
    #Packaging;
  };

  module Category {
    public func compare(category1 : Category, category2 : Category) : Order.Order {
      switch (category1, category2) {
        case (#SocialMedia, #SocialMedia) { #equal };
        case (#SocialMedia, _) { #less };
        case (#Posters, #SocialMedia) { #greater };
        case (#Posters, #Posters) { #equal };
        case (#Posters, _) { #less };
        case (#Thumbnails, #Logos) { #less };
        case (#Thumbnails, #Packaging) { #less };
        case (#Thumbnails, #Print) { #less };
        case (#Thumbnails, #Posters) { #greater };
        case (#Thumbnails, #SocialMedia) { #greater };
        case (#Thumbnails, #Thumbnails) { #equal };
        case (#Logos, #Logos) { #equal };
        case (#Logos, #Packaging) { #less };
        case (#Logos, #Print) { #less };
        case (#Logos, #Posters) { #greater };
        case (#Logos, #SocialMedia) { #greater };
        case (#Packaging, #Packaging) { #equal };
        case (#Packaging, #Print) { #less };
        case (#Packaging, #Posters) { #greater };
        case (#Packaging, #SocialMedia) { #greater };
        case (#Packaging, #Thumbnails) { #greater };
        case (#Print, #Print) { #equal };
        case (#Print, _) { #greater };
        case (_) { #equal };
      };
    };
  };

  type Project = {
    id : Nat;
    title : Text;
    description : Text;
    imageUrl : Text;
    category : Category;
    isFeatured : Bool;
  };

  module Project {
    public func compareByTitle(p1 : Project, p2 : Project) : Order.Order {
      Text.compare(p1.title, p2.title);
    };

    public func filterByCategory(items : [Project], category : Category) : [Project] {
      let projectsList = List.empty<Project>();
      for (project in items.values()) {
        switch (project.category, category) {
          case (#Logos, #Logos) { projectsList.add(project) };
          case (#Packaging, #Packaging) { projectsList.add(project) };
          case (#Posters, #Posters) { projectsList.add(project) };
          case (#Print, #Print) { projectsList.add(project) };
          case (#SocialMedia, #SocialMedia) { projectsList.add(project) };
          case (#Thumbnails, #Thumbnails) { projectsList.add(project) };
          case (_) {};
        };
      };
      projectsList.toArray();
    };
  };

  type Message = {
    messageId : Text;
    name : Text;
    email : Text;
    message : Text;
    category : Category;
    timestamp : Time.Time;
    isRead : Bool;
  };

  type FeaturedItem = {
    id : Nat;
    projectId : Nat;
    title : Text;
    description : Text;
    imageUrl : Text;
  };

  module CategoryExtensions {
    public func toText(category : Category) : Text {
      switch (category) {
        case (#SocialMedia) { "Social Media" };
        case (#Posters) { "Posters" };
        case (#Thumbnails) { "Thumbnails" };
        case (#Logos) { "Logos" };
        case (#Print) { "Print" };
        case (#Packaging) { "Packaging" };
      };
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let projects = Map.empty<Text, Project>();
  let featuredItems = Map.empty<Nat, FeaturedItem>();
  let messages = Map.empty<Text, Message>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var projectIdCounter = 0;
  var featuredItemIdCounter = 0;

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCategories() : async [Text] {
    let categories = [
      CategoryExtensions.toText(#SocialMedia),
      CategoryExtensions.toText(#Posters),
      CategoryExtensions.toText(#Thumbnails),
      CategoryExtensions.toText(#Logos),
      CategoryExtensions.toText(#Print),
      CategoryExtensions.toText(#Packaging),
    ];
    categories;
  };

  public shared ({ caller }) func createProject(title : Text, description : Text, imageUrl : Text, category : Category, isFeatured : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create projects");
    };

    let newProject = {
      id = projectIdCounter;
      title;
      description;
      imageUrl;
      category;
      isFeatured;
    };

    projects.add(title, newProject);

    if (isFeatured) {
      let newFeaturedItem = {
        id = featuredItemIdCounter;
        projectId = projectIdCounter;
        title;
        description;
        imageUrl;
      };
      featuredItems.add(featuredItemIdCounter, newFeaturedItem);
      featuredItemIdCounter += 1;
    };

    projectIdCounter += 1;
  };

  public shared ({ caller }) func updateProject(id : Nat, title : Text, description : Text, imageUrl : Text, category : Category, isFeatured : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update projects");
    };

    let updatedProject = {
      id;
      title;
      description;
      imageUrl;
      category;
      isFeatured;
    };

    projects.add(title, updatedProject);

    if (isFeatured) {
      let newFeaturedItem = {
        id = featuredItemIdCounter;
        projectId = id;
        title;
        description;
        imageUrl;
      };
      featuredItems.add(featuredItemIdCounter, newFeaturedItem);
      featuredItemIdCounter += 1;
    };
  };

  public shared ({ caller }) func deleteProject(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete projects");
    };

    for (project in projects.values()) {
      if (project.id == id) {
        projects.remove(project.title);
      };
    };

    let featuredItemsToDelete = List.empty<Nat>();
    for ((featuredId, item) in featuredItems.entries()) {
      if (item.projectId == id) {
        featuredItemsToDelete.add(featuredId);
      };
    };

    for (featuredId in featuredItemsToDelete.values()) {
      featuredItems.remove(featuredId);
    };
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    let projectsArray = projects.values().toArray();
    projectsArray.sort(Project.compareByTitle);
  };

  public query ({ caller }) func getProjectsByCategory(category : Category) : async [Project] {
    let projectsArray = projects.values().toArray();
    Project.filterByCategory(projectsArray, category);
  };

  public query ({ caller }) func getFeaturedProjects() : async [Project] {
    let projectsList = List.empty<Project>();
    for (project in projects.values()) {
      if (project.isFeatured) {
        projectsList.add(project);
      };
    };
    projectsList.toArray();
  };

  public query ({ caller }) func getFeaturedSliderItems() : async [FeaturedItem] {
    let featuredItemsList = List.empty<FeaturedItem>();
    for (item in featuredItems.values()) {
      featuredItemsList.add(item);
    };
    featuredItemsList.toArray();
  };

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, messageContent : Text, category : Category) : async Bool {
    let messageId = email.concat(Time.now().toText());
    let newMessage = {
      messageId;
      name;
      email;
      message = messageContent;
      category;
      timestamp = Time.now();
      isRead = false;
    };

    messages.add(messageId, newMessage);
    true;
  };

  public shared ({ caller }) func markMessageAsRead(messageId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can mark messages as read");
    };

    switch (messages.get(messageId)) {
      case (?message) {
        let updatedMessage = {
          message with
          isRead = true;
        };
        messages.add(messageId, updatedMessage);
      };
      case (null) { Runtime.trap("Message not found") };
    };
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all messages");
    };
    let messagesList = List.empty<Message>();
    for (message in messages.values()) {
      messagesList.add(message);
    };
    messagesList.toArray();
  };

  public query ({ caller }) func getMessagesByCategory(category : Category) : async [Message] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view messages by category");
    };
    let messagesList = List.empty<Message>();
    for (message in messages.values()) {
      switch (message.category, category) {
        case (#Logos, #Logos) { messagesList.add(message) };
        case (#Packaging, #Packaging) { messagesList.add(message) };
        case (#Posters, #Posters) { messagesList.add(message) };
        case (#Print, #Print) { messagesList.add(message) };
        case (#SocialMedia, #SocialMedia) { messagesList.add(message) };
        case (#Thumbnails, #Thumbnails) { messagesList.add(message) };
        case (_) {};
      };
    };
    messagesList.toArray();
  };

  public query ({ caller }) func getUnreadMessages() : async [Message] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view unread messages");
    };
    let unreadMessagesList = List.empty<Message>();
    for (message in messages.values()) {
      if (not message.isRead) {
        unreadMessagesList.add(message);
      };
    };
    unreadMessagesList.toArray();
  };

  public query ({ caller }) func getProjectsByCategoryName(categoryName : Text) : async [Project] {
    let categoryOpt = switch (categoryName) {
      case ("social media") { ?#SocialMedia };
      case ("posters") { ?#Posters };
      case ("thumbnails") { ?#Thumbnails };
      case ("logos") { ?#Logos };
      case ("print") { ?#Print };
      case ("packaging") { ?#Packaging };
      case (_) { null };
    };
    let projectsArray = projects.values().toArray();
    switch (categoryOpt) {
      case (?category) { Project.filterByCategory(projectsArray, category) };
      case (null) { [] };
    };
  };
};
