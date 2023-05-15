export type User = {
  id: number
  email: string
  name: string | null
  avatar: string | null
  role: UserRole
  locationId: number | null
  location: Location | null
  phoneNumber: string | null
  reputation: number
  lastLogin: string | null
  requests: Requests
  contributions: Contributions
  comments: Comments
  interests: Interests
  writtenReviews: Reviews
  receivedReviews: Reviews
  views: RequestViews
  notifications: Notifications
  messages: Messages

  createdAt: string
  updatedAt: string
}

export type UserPost = Pick<
  User,
  'email' | 'avatar' | 'name' | 'role' | 'phoneNumber'
> & { interests: number[] }

export type Location = {
  id: number
  longitude: number
  latitude: number
}

export type Category = {
  id: number
  nameUk: string
  nameEn: string
  descriptionUk: string
  descriptionEn: string
}

export type Categories = Category[]

export type Request = {
  id: number
  title: string
  description: string
  categoryId: number
  category: Category
  type: RequestType
  status: RequestStatus
  userId: number
  user: User
  viewsCount: number
  contributionsCount: number
  totalCollected: number | null
  monobankBucketLink: string | null
  goalAmount: number | null
  contributions: Contributions
  comments: Comments
  attachments: Attachments
  tags: Tags
  milestones: Milestones
  views: RequestViews
  messages: Messages

  createdAt: string
  updatedAt: string
}

export type Requests = Request[]

export type RequestPost = Pick<
  Request,
  | 'title'
  | 'description'
  | 'categoryId'
  | 'type'
  | 'status'
  | 'goalAmount'
  | 'totalCollected'
  | 'monobankBucketLink'
> & { tags: number[]; attachments: string[] }

export type Attachment = {
  id: number
  fileUrl: string
  requestId: number
  request: Request
}

export type Attachments = Attachment[]

export type Contribution = {
  id: number
}

export type Contributions = Contribution[]

export type Interest = {
  id: number
  nameUk: string
  nameEn: string
}

export type Interests = Interest[]

export type Tag = {
  id: number
  nameUk: string
  nameEn: string
}

export type Tags = Tag[]

export type Comment = {
  id: number
  content: string
  authorId: number
  author: User
  requestId: number
  request: Request

  createdAt: string
  updatedAt: string
}

export type CommentPost = Pick<Comment, 'content'>

export type Comments = Comment[]

export type Review = {
  id: number
}

export type Reviews = Review[]

export type Milestone = {
  id: number
  title: string
  description: string
  status: MilestoneStatus
  requestId: number
  request: Request
  dueDate: string

  createdAt: string
  updatedAt: string
}

export type Milestones = Milestone[]

export type RequestView = {
  id: number
  requestId: number
  request: Request
  userId: number
  user: User
}

export type RequestViews = RequestView[]

export type Notification = {
  id: number
  content: string
  type: NotificationType
  recipientId: number
  recipient: User
}

export type Notifications = Notification[]

export type Message = {
  id: number
  content: string
  senderId: number
  sender: User
  requestId: number
  request: Request

  createdAt: string
}

export type Messages = Message[]

export enum UserRole {
  ADMIN = 'ADMIN',
  VOLUNTEER = 'VOLUNTEER',
  DONOR = 'DONOR',
  MILITARY = 'MILITARY',
  REFUGEE = 'REFUGEE',
}

export enum NotificationType {
  NEW_REQUEST = 'NEW_REQUEST',
  CONTRIBUTION_RECEIVED = 'CONTRIBUTION_RECEIVED',
  REQUEST_UPDATE = 'REQUEST_UPDATE',
  COMMENT = 'COMMENT',
}

export enum RequestStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED',
}

export enum RequestType {
  FINANCIAL = 'FINANCIAL',
  COLLECTION = 'COLLECTION',
  MATERIAL = 'MATERIAL',
  THINGS = 'THINGS',
}

export enum MilestoneStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
